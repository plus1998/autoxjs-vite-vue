export default {
    ExecScript(params: string) {
        device.vibrate(1000);
        console.log('[ExecScript]', params);
        console.log(`./scripts/${params}.js`);
        engines.execScriptFile(`./modules/scripts/${params}.js`);
        return 'ok';
    }
}