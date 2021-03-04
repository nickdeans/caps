'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
const capsURL = 'http://localhost:3000/caps';
const capsServer = io.connect(capsURL);


setInterval(() => {
    const newObj = new Vendor();
    capsServer.emit('pickup', { payload: newObj});
}, 5000)

capsServer.on('delivered', async (payload) => {
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
