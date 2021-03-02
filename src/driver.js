'use strict';

const Events = require('events');
const eventEmitter = new Events();
const eventPool = require('./events.js');

// I believe I have to use this and connect to the callback in caps.js
function driverEvents(payload) {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload.vendor.orderId}`);
        eventEmitter.emit('in-transit', payload);
    }, 1000);
    setTimeout(() => {
        console.log('delivered');
        eventEmitter.emit('delivered', payload);
    }, 3000)
}

// eventEmitter.on('pickup', async (payload) => {
// });

module.exports = {
    driverEvents
}