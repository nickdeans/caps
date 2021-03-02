'use strict';

const Events = require('events');
const faker = require('faker');
const eventEmitter = new Events();

setInterval(() => {
    const newObj = new Vendor();
    eventEmitter.emit('pickup', { payload: newObj});
}, 5000)

eventEmitter.on('delivered', async (payload) => {
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