'use strict';

const driver = require('../driver.js');
const vendor = require('../vendor.js');

console.log = jest.fn();

describe('Testing the driver module', () => {
    it('should console log output', () => {
        let payload = {storeName: 'nicks', orderId: '32', customerName: 'bob', address: '711 montana ave'}
    

    driver.driverEvents(payload);
    expect(console.log).toHaveBeenCalled();
    });
})
