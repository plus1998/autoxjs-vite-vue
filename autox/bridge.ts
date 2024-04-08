module.exports = [
    {
        name: 'getDeviceBrand',
        callback: (params: string, cb: (data: string) => void) => {
            console.log('getDeviceBrand', params);
            cb(device.brand);
        }
    },
    {
        name: 'getDeviceModel',
        callback: (params: string, cb: (data: string) => void) => {
            console.log('getDeviceModel', params);
            cb(device.model);
        }
    },
    {
        name: 'getDeviceBattery',
        callback: (params: string, cb: (data: string) => void) => {
            console.log('getDeviceBattery', params);
            let battery = device.getBattery().toFixed(0);
            cb(battery);
        }
    }
]