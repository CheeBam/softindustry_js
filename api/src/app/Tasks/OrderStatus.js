'use strict';

const Task = use('Task');
const Order = use('App/Models/Order');
const Constants = use('App/Helpers/Constants');
const Database = use('Database');

class OrderStatus extends Task {
    static get schedule() {
        return '1 0 * * *'; // At 00:01
        // return '*/1 * * * *';
    }

    async handle() {
        try {
            const rows = await Order
                .query()
                .where('deleted_at', null)
                .where('status_id', Constants.STATUS_CONFIRMED)
                .where(Database.raw('due_date < NOW()'))
                .update({status_id: Constants.STATUS_EXPIRED});

            this.info(`[Scheduler]: Order status success. Affected ${rows} rows`);
        } catch (e) {
            this.info('[Scheduler]: DB Error', e);
        }
    }
}

module.exports = OrderStatus;
