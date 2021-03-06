'use strict';

// Dependencies
const socketio = require('socket.io');

// Creates a port 
const io = socketio(3000);

// Creates namepsace
const caps = io.of('/caps');

const messageQueue = {
    received: {},
    inTransit: {},
    completed: {},
};

// caps connection, socket.io gives our callback a socket
caps.on('connection', capsSocket => {
    console.log('new caps connection established', capsSocket.id);

    // waits for an event to be emitted on a socket
    capsSocket.on('pickup', payload => {
        messageQueue.received[payload.orderId] = payload;
        logger('pickup', payload);
        // names the event and passes a payload to be sent

        caps.emit('pickup', payload);
    })

    capsSocket.on('in-transit', payload => {
        messageQueue.inTransit[payload.orderId] = payload;
        logger('in-transit', payload);

        capsSocket.emit('onWay', payload);
    })

    capsSocket.on('delivered', payload => {
        delete messageQueue.received[payload.orderId];
        delete messageQueue.inTransit[payload.orderId];
        delete messageQueue.completed[payload.orderId];

        caps.emit('completed', payload);
    })

    capsSocket.on('getAll', () => {
        for (let key in messageQueue.received) {
            capsSocket.emit('pickup', messageQueue.received[key]);
        }
        for (let key in messageQueue.inTransit) {
            capsSocket.emit('in-transit', messageQueue.inTransit[key]);
        }
        for (let key in messageQueue.completed) {
            capsSocket.emit('completed', messageQueue.completed[key]);
        }
    })

    capsSocket.on('completed', payload => {
        messageQueue.completed[payload.orderId] = payload;
        logger('Delivered', payload)

    })
});

function logger(event, payload) {
    let time = new Date();
    console.log({ event, time, payload });
}
