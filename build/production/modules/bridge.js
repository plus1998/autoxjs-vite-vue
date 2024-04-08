"use strict";
module.exports = [
    {
        name: 'getDeviceBattery',
        callback: function (data, cb) {
            console.log("received web count :" + data);
            toast(data);
            cb(device.getBattery().toFixed(0));
        }
    }
];
