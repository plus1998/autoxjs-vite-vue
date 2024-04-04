"ui";

ui.layout(`
    <vertical>
        <webview id="web" h="*"/>
    </vertical>`)

// 安全策略放通
ui.web.getSettings().setAllowFileAccessFromFileURLs(true);
ui.web.getSettings().setAllowUniversalAccessFromFileURLs(true);
// 加载页面
ui.web.loadUrl("file://" + files.path("./dist/index.html"))
// 加载函数
const LIST = require("./modules/bridge.js")
LIST.forEach((handler) => {
    ui.web.jsBridge.registerHandler(handler.name, handler.callback)
})