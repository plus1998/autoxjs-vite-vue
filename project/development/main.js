"ui";

ui.layout(`
    <vertical>
        <webview id="web" h="*"/>
    </vertical>`)

// 加载页面
ui.web.loadUrl("http://localhost:5173")
// 加载函数
const LIST = require("./modules/bridge.js")
LIST.forEach((handler) => {
    ui.web.jsBridge.registerHandler(handler.name, handler.callback)
})
