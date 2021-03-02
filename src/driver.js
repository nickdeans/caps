'use strict';

const Events = require('events');
const eventEmitter = new Events();

// function driverEvents(payload) {
// }

eventEmitter.on('pickup', async (payload) => {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload.vendor.orderId}`);
        eventEmitter.emit('in-transit', payload);
    }, 1000);
    setTimeout(() => {
        console.log('delivered');
        eventEmitter.emit('delivered', payload);
    }, 3000)
});

module.exports = {
    driverEvents
}