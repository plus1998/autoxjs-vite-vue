export default {
    GetDeviceBrand(params: string) {
        console.log('getDeviceBrand', params);
        return device.brand;
    },
    GetDeviceModel(params: string) {
        console.log('getDeviceModel', params);
        return device.model;
    },
    GetDeviceBattery(params: string) {
        console.log('getDeviceBattery', params);
        let battery = device.getBattery().toFixed(0);
        return battery;
    },
    DeviceVibrate(params: string) {
        console.log('DeviceVibrate', params);
        device.vibrate(1000);
        return 'autox.js say: ok';
    }
}