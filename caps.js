'use strict';

// Dependencies
const eventPool = require('./events.js');
const vendor = require('./vendor.js');
const driver = require('./driver.js');

const vendorInterface = new vendor.Vendor();

// Eevnt that will be publised, setting up subscribers for events
eventPool.on('pickup', driver.driverEvents);
// eventPool.on('in-transit', driverEvents);
// eventPool.on('delivered', driverEvents);

// function driverEvents(payload) {
//     console.log(`EVENT : ${JSON.stringify(payload)}`)
// }

// Artificial interaction point
setInterval(() => {
    eventPool.emit('pickup', { payload: vendorInterface})
}, 2000)
