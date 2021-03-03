'use strict';

const eventPool = require('./events.js');

// I believe I have to use this and connect to the callback in caps.js
function driverEvents(payload) {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload.payload.orderId}`);
        eventPool.emit('in-transit', payload);
    }, 1000);
    setTimeout(() => {
        console.log('delivered');
        eventPool.emit('delivered', payload);
    }, 3000)
}

// eventPool.on('pickup', async (payload) => {
// });

module.exports = {
    driverEvents
}