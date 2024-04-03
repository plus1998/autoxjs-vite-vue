"ui";

ui.layout(`
    <vertical>
        <webview id="web" h="*"/>
    </vertical>`)

// webview允许跨域
ui.web.getSettings().setAllowFileAccessFromFileURLs(true);
ui.web.getSettings().setAllowUniversalAccessFromFileURLs(true);

ui.web.loadUrl("file://" + files.path("./dist/index.html"))