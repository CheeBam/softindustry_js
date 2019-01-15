'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
    return {greeting: 'Hello world in JSON'}
});

Route.group(() => {
    Route.post('auth/register', 'AuthController.register');
    Route.post('auth/login', 'AuthController.login');

    Route.get('providers', 'AuthController.index');

    Route.resource('positions', 'PositionController').apiOnly();

    Route.patch('orders/status', 'OrderController.changeStatus');
    Route.post('orders/download', 'OrderController.downloadJson').validator('DownloadJsonOrder');
    Route.resource('orders', 'OrderController').validator(new Map([
        [['index'], ['GetOrders']],
        [['store'], ['StoreOrder']],
        [['update'], ['UpdateOrder']],
    ])).apiOnly();
})
    .prefix('api/v1');


Route.group(() => {
    Route.get('auth/current', 'AuthController.current');
})
    .middleware('auth')
    .prefix('api/v1');
