'use strict';

// Dependencies
const socketio = require('socket.io');

// Creates a port 
const io = socketio(3000);

// Creates namepsace
const caps = io.of('/caps');

const messageQueue = {
    sent: {},
    received: {},
}

io.on('connection', socket => {
    console.log('new connection established :' + socket.id);
});

// caps connection, socket.io gives our callback a socket
caps.on('connection', capsSocket => {
    console.log('new caps connection established', capsSocket.id);

    capsSocket.on('received', payload => {
        messageQueue.sent[payload] = payload;

        capsSocket.broadcast.emit('received', payload);
        console.log(messageQueue);
    })

    // waits for an event to be emitted on a socket
    capsSocket.on('pickup', payload => {
        logger('pickup', payload);
        // names the event and passes a payload to be sent
        capsSocket.broadcast.emit('pickup', payload);
    })

    capsSocket.on('in-transit', payload => {
        logger('in-transit', payload);
        capsSocket.broadcast.emit('in-transit', payload);
    })

    capsSocket.on('delivered', payload => {
        delete messageQueue.sent[payload];
        messageQueue.received[payload] = payload;
        logger('delivered', payload);
        capsSocket.broadcast.emit('delivered', payload);
    })

    capsSocket.on('getAll', () => {
        for(let key in messageQueue.sent) {
            capsSocket.emit('get all', messageQueue.sent[key]);
        }
    })
})

function logger(event, payload) {
    let time = new Date();
    console.log({ event, time, payload });
}
