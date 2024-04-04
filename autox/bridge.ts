module.exports = [
    {
        name: 'getDeviceBattery',
        callback: (data: string, cb: (data: string) => void) => {
            console.log("received web count :" + data);
            toast(data);
            cb(device.getBattery().toFixed(0));
        }
    }
]