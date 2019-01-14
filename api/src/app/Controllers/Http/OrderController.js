'use strict';

const Order = use('App/Models/Order');
const Customer = use('App/Models/Customer');
const Position = use('App/Models/Position');
const OrderType = use('App/Models/OrderType');
const Status = use('App/Models/Status');
const Database = use('Database');
const {DateTime} = require('luxon');
const {validate} = use('Validator');
const Constants = use('App/Helpers/Constants');
const PaginationHelper = use('App/Helpers/PaginationHelper');

class OrderController {

    /**
     * Get orders for table
     *
     * GET orders
     */
    async index({auth, request, response}) {
        const validation = await validate(request.all(), {
            page: 'required',
        });

        if (validation.fails()) {
            return response.status(422).json({
                errors: validation.messages(),
            });
        }

        // check if company is logged
        let logged = false;
        try {
            logged = await auth.check()
        } catch (error) {
        }

        const {page} = request.all();

        const perPage = request.input('per_page') ? request.input('per_page') : Constants.PER_PAGE;
        const sortString = request.input('sort') ? request.input('sort') : 'id|desc';
        const sortParams = sortString.split('|');

        const search = request.input('search');
        const applySearch = search && search.length > 0;

        const filterType = request.input('type');
        const filterStatus = request.input('status');

        let orders = await Order
            .query()
            .where('deleted_at', null)
            .where(function () {
                if (filterStatus) {
                    this.where('orders.status_id', filterStatus)
                }
                if (filterType) {
                    this.where('orders.order_type_id', filterType)
                }
                if (logged) {
                    this.where('orders.user_id', auth.user.id)
                }
            })
            .where(function () {
                if (applySearch) {
                    this.orWhere('orders.sys_id', 'like', `%${search}%`);
                    this.orWhereHas('customer', (builder) => {
                        builder.where('customers.name', 'like', `%${search}%`);
                    });
                    this.orWhereHas('customer', (builder) => {
                        builder.where('surname', 'like', `%${search}%`);
                    });
                    this.orWhereHas('provider', (builder) => {
                        builder.where('company', 'like', `%${search}%`);
                    });
                }
            })
            .with('provider')
            .with('customer')
            .with('position')
            .with('status')
            .with('type')
            .orderBy(...sortParams)
            .paginate(page, perPage);

        orders = orders.toJSON();

        orders.data = orders.data.map((el) => {
            const diff = DateTime.fromFormat(el.due_date, 'dd-MM-yyyy').diff(DateTime.local(), 'days').toObject();
            el.can_edit = Constants.ORDER_EDITING_DAYS_LIMIT < diff.days;

            // el.can_edit = Math.random() % 2;
            el.metainfo = el.__meta__;
            delete el.__meta__;
            return el;
        });

        return (new PaginationHelper()).paginateResult(orders);
    }

    /**
     * Create/save a new order.
     * POST orders
     */
    async store({request, response}) {

        const validation = await validate(request.all(), {
            sys_id: 'required',
            customer: 'required',
            order_type_id: 'required',
            position_id: 'required',
            due_date: 'required',
        });

        if (validation.fails()) {
            return response.status(422).json({
                errors: validation.messages(),
            });
        }

        const position = await Position
            .query()
            .where('id', request.input('position_id'))
            .first();

        // let customer = await Customer
        //     .query()
        //     .where('email', request.input('customer.email')
        //     .where('name', request.input('customer.name')
        //     .where('surname', request.input('customer.surname')
        //     .where('phone', request.input('customer.phone')
        //     .first();
        //
        // if (!customer) {
        //     customer = await Customer.create({
        //         email: request.input('customer.email'),
        //         name: request.input('customer.name'),
        //         surname: request.input('customer.surname'),
        //         phone: request.input('customer.phone'),
        //     });
        // }

        const customer = await Customer
            .findOrCreate(
                {
                    email: request.input('customer.email'),
                    name: request.input('customer.name'),
                    surname: request.input('customer.surname'),
                    phone: request.input('customer.phone'),
                }
            );

        const countOrders = await Order
            .query()
            .where(Database.raw('MONTH(created_at)'), '=', DateTime.local().month)
            .where(Database.raw('YEAR(created_at)'), '=', DateTime.local().year)
            .count('* as total');

        const order = await Order.create({
            sys_id: request.input('sys_id').replace(/__/i, ++countOrders[0].total),
            customer_id: customer.id,
            position_id: position.id,
            user_id: position.user_id,
            order_type_id: request.input('order_type_id'),
            due_date: DateTime.fromISO(request.input('due_date')).toFormat('yyyy-MM-dd'),
            comment: request.input('comment'),
            status_id: Constants.STATUS_PROCESS,
        });

        return {};
    }

    /**
     * Update order.
     * PUT orders
     */
    async update({params, request, response}) {

        const validation = await validate(request.all(), {
            customer: 'required',
            position_id: 'required',
        });

        if (validation.fails()) {
            return response.status(422).json({
                errors: validation.messages(),
            });
        }

        const position = await Position
            .query()
            .where('id', request.input('position_id'))
            .first();

        // update order
        const order = await Order
            .query()
            .where('id', params.id)
            .first();

        // Simple check - may be replaced to middleware
        const diff = DateTime.fromJSDate(order.due_date).diff(DateTime.local(), 'days').toObject();
        if (Constants.ORDER_EDITING_DAYS_LIMIT >= diff.days) {
            return response.status(403).json({
                errors: 'Can\'t update already',
            });
        }

        order.merge(
            {
                position_id: position.id,
                user_id: position.user_id,
                comment: request.input('comment'),
            }
        );
        await order.save();

        // update order customer
        const customer = await Customer
            .query()
            .where('id', order.customer_id)
            .first();

        customer.merge(
            {
                email: request.input('customer.email'),
                name: request.input('customer.name'),
                surname: request.input('customer.surname'),
                phone: request.input('customer.phone'),
            }
        );

        await customer.save();

        return {};
    }

    /**
     * Change status
     * PATCH orders/status
     */
    async changeStatus({request}) {

        const order = await Order
            .query()
            .where('id', request.input('order_id'))
            .first();

        order.status_id = request.input('status_id');
        order.save();

        return {};
    }

    /**
     * Get order
     * GET orders/:id
     */
    async show({params}) {

        const order = await Order
            .query()
            .where('id', params.id)
            .with('provider')
            .with('customer')
            .with('position')
            .with('status')
            .with('type')
            .first();

        return order;
    }

    /**
     * Download orders json.
     * POST orders/download
     */
    async downloadJson({auth, request, response}) {

        const validation = await validate(request.all(), {
            file: 'required',
        });

        if (validation.fails()) {
            return response.status(422).json({
                errors: validation.messages(),
            });
        }

        let total = await Order
            .query()
            .where(Database.raw('MONTH(created_at)'), '=', DateTime.local().month)
            .where(Database.raw('YEAR(created_at)'), '=', DateTime.local().year)
            .count('* as total');

        total = total[0].total + 1;

        try {
            const json = JSON.parse(JSON.stringify(eval(`(${request.input('file')})`)));

            const results = json.map(async (item) => {
                const status = await Status
                    .query()
                    .where('title', item.status)
                    .first();

                if (!status) return;

                const orderType = await OrderType
                    .query()
                    .where('title', item.type)
                    .first();

                if (!orderType) return;

                const position = await Position
                    .query()
                    .where('title', item.position)
                    .first();

                if (!position) return;

                const customer = await Customer
                    .findOrCreate(
                        {
                            email: item.customer.email,
                            name: item.customer.name,
                            surname: item.customer.surname,
                            phone: item.customer.phone,
                        }
                    );

                item.customer_id = customer.id;
                item.sys_id = `${orderType.id === Constants.ORDER_TYPE_RETAIL ? 'p' : 'o'}-${DateTime.local().toFormat('yyMMdd')}${total}`;
                item.due_date = DateTime.fromFormat(item.due_date, 'dd-MM-yyyy').toFormat('yyyy-MM-dd');
                item.position_id = position.id;
                item.user_id = position.user_id;
                item.order_type_id = orderType.id;
                item.status_id = status.id;

                delete item.customer;
                delete item.status;
                delete item.type;
                delete item.position;

                total++;

                return item;
            });

            const data = await Promise.all(results);
            await Order.createMany(data.filter((item) => item));

        } catch (e) {
            return response.status(500).json({
                errors: 'Error on download file',
            });
        }

        return {};
    }


}

module.exports = OrderController;
