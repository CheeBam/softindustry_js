'use strict';

/*
|--------------------------------------------------------------------------
| MainSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Status = use('App/Models/Status');
const OrderType = use('App/Models/OrderType');
const Customer = use('App/Models/Customer');
const Position = use('App/Models/Position');
const User = use('App/Models/User');
const Order = use('App/Models/Order');
const Constants = use('App/Helpers/Constants');

class MainSeeder {
    async run() {
        /**
         * Statuses.
         */
        let data = await Status.find(Constants.STATUS_PROCESS);

        if (data === null) {
            await Status.create({
                id: Constants.STATUS_PROCESS,
                title: 'Process',
            });
        }

        data = await Status.find(Constants.STATUS_CONFIRMED);

        if (data === null) {
            await Status.create({
                id: Constants.STATUS_CONFIRMED,
                title: 'Confirmed',
            });
        }

        data = await Status.find(Constants.STATUS_DONE);

        if (data === null) {
            await Status.create({
                id: Constants.STATUS_DONE,
                title: 'Done',
            });
        }

        data = await Status.find(Constants.STATUS_EXPIRED);

        if (data === null) {
            await Status.create({
                id: Constants.STATUS_EXPIRED,
                title: 'Expired',
            });
        }

        data = await Status.find(Constants.STATUS_FAILED);

        if (data === null) {
            await Status.create({
                id: Constants.STATUS_FAILED,
                title: 'Failed',
            });
        }

        /**
         * Types.
         */
        data = await OrderType.find(Constants.ORDER_TYPE_WHOLESALE);

        if (data === null) {
            await OrderType.create({
                id: Constants.ORDER_TYPE_WHOLESALE,
                title: 'Wholesale',
            });
        }

        data = await OrderType.find(Constants.ORDER_TYPE_RETAIL);

        if (data === null) {
            await OrderType.create({
                id: Constants.ORDER_TYPE_RETAIL,
                title: 'Retail',
            });
        }

        /**
         * Users (Company).
         */
        data = await User.find(1);

        if (data === null) {
            await User.create({
                id: 1,
                email: 'company1@test.com',
                password: 'qwerty',
                company: 'Stationery',
            });
        }

        data = await User.find(2);

        if (data === null) {
            await User.create({
                id: 2,
                email: 'company2@test.com',
                password: 'qwerty',
                company: 'Products',
            });
        }

        /**
         * Positions
         */
        data = await Position.find(1);

        if (data === null) {
            await Position.create({
                id: 1,
                title: 'Pen',
                user_id: 1,
            });
        }

        data = await Position.find(2);

        if (data === null) {
            await Position.create({
                id: 2,
                title: 'Pencil',
                user_id: 1,
            });
        }

        data = await Position.find(3);

        if (data === null) {
            await Position.create({
                id: 3,
                title: 'Eraser',
                user_id: 1,
            });
        }

        data = await Position.find(4);

        if (data === null) {
            await Position.create({
                id: 4,
                title: 'Bred',
                user_id: 2,
            });
        }

        data = await Position.find(5);

        if (data === null) {
            await Position.create({
                id: 5,
                title: 'Milk',
                user_id: 2,
            });
        }

        data = await Position.find(6);

        if (data === null) {
            await Position.create({
                id: 6,
                title: 'Egg',
                user_id: 2,
            });
        }

        /**
         * Customers
         */
        data = await Customer.find(1);

        if (data === null) {
            await Customer.create({
                id: 1,
                email: 'john@test.com',
                name: 'John',
                surname: 'Black',
                phone: '0504445566',
            });
        }

        data = await Customer.find(2);

        if (data === null) {
            await Customer.create({
                id: 2,
                email: 'brandon@test.com',
                name: 'Brandon',
                surname: 'Smith',
                phone: '0509998877',
            });
        }

        /**
         * Orders
         */
        data = await Order.find(1);

        if (data === null) {
            await Order.create({
                id: 1,
                sys_id: 'o-1901141',
                customer_id: '1',
                user_id: '1',
                position_id: '1',
                order_type_id: '1',
                status_id: '2',
                comment: 'comment 1',
                due_date: '2019-01-18 00:00:00',
                created_at: '2019-01-14 00:00:00',
            });
        }

        data = await Order.find(2);

        if (data === null) {
            await Order.create({
                id: 2,
                sys_id: 'o-1901142',
                customer_id: '2',
                user_id: '1',
                position_id: '4',
                order_type_id: '1',
                status_id: '2',
                comment: '',
                due_date: '2019-01-18 00:00:00',
                created_at: '2019-01-14 00:00:00',
            });
        }

        data = await Order.find(3);

        if (data === null) {
            await Order.create({
                id: 3,
                sys_id: 'p-1901153',
                customer_id: '1',
                user_id: '2',
                position_id: '2',
                order_type_id: '2',
                status_id: '1',
                comment: 'comment 3',
                due_date: '2019-01-18 00:00:00',
                created_at: '2019-01-15 00:00:00',
            });
        }
    }
}

module.exports = MainSeeder;
