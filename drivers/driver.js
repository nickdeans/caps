'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const capsURL = 'http://localhost:3000/caps';
const capsServer = io.connect(capsURL);

// I believe I have to use this and connect to the callback in caps.js
capsServer.on('pickup', payload => {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload.payload.orderId}`);
        capsServer.emit('in-transit', payload);
    }, 1000);
    setTimeout(() => {
        console.log('delivered');
        capsServer.emit('delivered', payload);
    }, 3000)
});

    

// eventPool.on('pickup', async (payload) => {
// });

// module.exports = {
//     driverEvents
// }