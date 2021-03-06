'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
const capsURL = 'http://localhost:3000/caps';
const capsServer = io.connect(capsURL);

capsServer.emit('getAll')

setInterval(() => {
    const newObj = new Vendor();
    capsServer.emit('pickup', newObj);
}, 5000)

capsServer.on('pickup', (payload) => {
    console.log(`ORDER PICKED UP AND ON THE WAY`);
})

capsServer.on('delivered', async (payload) => {
    console.log('thank you', payload);
});

class Vendor {
    constructor() {
        this.storeName = faker.name.findName(),
        this.orderId = faker.random.uuid(),
        this.customerName = faker.name.findName(),
        this.address = faker.address.streetAddress();
    }
}
