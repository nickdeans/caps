'use strict';

// Dependencies
const eventPool = require('./events.js');
const Vendor = require('./vendor.js');
const driver = require('./driver.js');

const vendorInterface = new Vendor();

eventPool.on('pickup', driver)

// Artificial interaction point
setInterval(() => {
    eventPool('pickup', { message: vendorInterface.create('Nick test')})
}, 2000)
