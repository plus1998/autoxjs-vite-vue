// axp-logger文档 http://docs.axp.auair.cn

let logger = require('./logger/index.min.js')
// 授权码
logger.setLicenseKey('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaWQiOiI2Njg2MjI0YjA2MTVlZmI3NDdkYWY1OTAiLCJwaWQiOiI2Njg2MjFlMjA2MTVlZmI3NDdkYWY1NzgiLCJwcGlkIjoiNjY4NjIxZmYwNjE1ZWZiNzQ3ZGFmNTg5IiwidSI6Im9yZy5hdXRvanMuYXV0b3hqcy52NiIsImlhdCI6MTcyMDA2NjYzNSwiZXhwIjoxNzUxNzc1NDM1fQ.V_fyw_hIrh5RBTBy4HeH8pQ36xppYfN3JI5AZ796GcM');

logger.onerror((error: any) => {
    alert('加载日志模块错误' + error.message)
})
logger.onloaded(() => {
    // 使用线程启动脚本函数
    threads.start(main)
})

const main = () => {
    logger.setTouchable(true);
    logger.debug('调试日志')
    logger.info('信息日志')
    logger.warn('警告日志')
    try {
        throw new Error('模拟一个错误')
    } catch (error) {
        logger.error(error)
    }
    logger.success('成功日志')
    //保持脚本运行
    setInterval(() => { }, 1000);
}