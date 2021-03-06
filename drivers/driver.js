'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const capsURL = 'http://localhost:3000/caps';
const capsServer = io.connect(capsURL);

capsServer.emit('getAll');

// wait for pick up event to be emitted from server
capsServer.on('pickup', payload => {
    setTimeout(() => {
        capsServer.emit('delivered', payload)
        console.log(`DRIVER: picked up ${payload.orderId}`);
        capsServer.emit('in-transit', payload);
    }, 1000);
});

capsServer.on('onWay', payload => {
    setTimeout(() => {
        capsServer.emit('delivered', payload)

        capsServer.emit('completed', payload);
    }, 3000)
})

    

