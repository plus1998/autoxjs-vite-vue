# AutoX.js + Vite + Vue3 + Typescript

这是一个AutoX.js工程化项目，支持开发环境热更新

# 使用指南

1. ```npm install```
2. 修改项目信息 (project/production/project.json)

### 开发环境

1. ```npm run dev```
2. Autox.js输入电脑ip连接电脑 - 项目仅运行
3. 修改 autox/bridge.ts - 体验热更新

### 生产构建
1. ```npm run build```
2. Autox.js输入电脑ip连接电脑 - 项目自动保存到手机
3. 项目路径为 autox/build/production


# 示例

```typescript
// autox/bridge.ts
module.exports = [
    {
        name: 'getDeviceBattery',
        callback: (data: string, cb: (data: string) => void) => {
            console.log("received web count :" + data);
            toast(data);
            cb(device.getBattery().toFixed(2));
        }
    }
]

// vue
$autox.callHandler("getDeviceBattery", count.value.toString(), (data: string) => {
    battery.value = data
});
```


# 参考项目

* [Auto.js-VSCode-Extension](https://github.com/kkevsekk1/Auto.js-VSCode-Extension)


# License

See the LICENSE file for more details.
