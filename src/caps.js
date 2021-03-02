'use strict';

// Dependencies
const eventPool = require('./events.js');
const Vendor = require('./vendor.js');
const driver = require('./driver.js');

const vendorInterface = new Vendor();

eventPool.on('pickup', driver.driverEvents);

// Artificial interaction point
setInterval(() => {
    eventPool.emit('pickup', { storeName: "nicks", orderId: "24", customername: "bob", address: '711 Montana ave'})
}, 2000)
