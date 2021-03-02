'use strict';

const driver = require('../src/driver.js');
const vendor = require('../src/vendor.js');

console.log = jest.fn();

describe('Testing the driver module', () => {
    it('should console log output', () => {
        let payload = {storeName: 'nicks', orderId: '32', customerName: 'bob', address: '711 montana ave'}
    

    driver.driverEvents(payload);
    expect(console.log).toHaveBeenCalled();
    });
})
