module.exports = [
    {
        name: 'getDeviceBattery',
        callback: (data: string, cb: (data: string) => void) => {
            console.log("received web count :" + data);
            toast('received web count :' + data);
            let battery = device.getBattery().toFixed(0);
            cb(battery);
        }
    }
]