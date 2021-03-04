'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const capsURL = 'http://localhost:3000/caps';
const capsServer = io.connect(capsURL);

// wait for pick up event to be emitted from server
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

    

