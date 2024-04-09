import DeviceApi from './service/device';

const modules = [
    // 导入模块放到这里
    DeviceApi
] as { [key: string]: Function }[]

const apis = [];
for (const module of modules) {
    apis.push(...Object.keys(module).map((key) => {
        return {
            name: key,
            callback: (params: string, cb: (data: string) => void) => {
                cb(module[key](params));
            }
        }
    }))
}

module.exports = apis