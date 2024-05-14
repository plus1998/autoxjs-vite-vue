let logger = require('./logger/index.min.js')
// 授权码
logger.setLicenseKey('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaWQiOiI2NjQxYjM5NjA3NWU5MDcwYWExMWQ3NDYiLCJwaWQiOiI2NjQxYjE4MTA3NWU5MDcwYWExMWQ3MjciLCJwcGlkIjoiNjY0MWIxYjAwNzVlOTA3MGFhMTFkNzNiIiwidSI6Im9yZy5hdXRvanMuYXV0b3hqcy52NiIsImlhdCI6MTcxNTU4MTg0NiwiZXhwIjoxNzQ3MjkwNjQ2fQ.RGZkH7EZbDeq-ahOo_-hbvF46kEK-1g4DNLW_ZoWWmk');

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