'use strict';

require('dotenv').config();
const faker = require('faker');
const eventPool = require('./events.js');


setInterval(() => {
    const newObj = new Vendor();
    eventPool.emit('pickup', { payload: newObj});
}, 5000)

eventPool.on('delivered', async (payload) => {
    console.log('thank you', payload);
});

class Vendor {
    constructor() {
        this.storeName = process.env.STORENAME,
        this.orderId = faker.random.uuid(),
        this.customerName = faker.name.findName(),
        this.address = faker.address.streetAddress();
    }
}

module.exports = {
    Vendor,
}