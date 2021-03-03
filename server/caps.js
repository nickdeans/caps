'use strict';

// Dependencies
const socketio = require('socket.io');
const io = socketio(3000);
const caps = io.of('/caps');

// const vendorInterface = new vendor.Vendor();

io.on('connection', socket => {
    console.log('new connection established :' + socket.id);
});

caps.on('connection', capsSocket => {
    console.log('new caps connection established', capsSocket.id);

    capsSocket.on('pickup', payload => {
        console.log('Event', payload);
        capsSocket.broadcast.emit('pickup', payload);
    })

    capsSocket.on('in-transit', payload => {
        console.log('Event', payload);
    })

    capsSocket.on('delivered', payload => {
        console.log('Event', payload);
        capsSocket.broadcast.emit('delivered', payload);
    })
})

// Artificial interaction point
// setInterval(() => {
//     eventPool.emit('pickup', { payload: vendorInterface})
// }, 2000)
