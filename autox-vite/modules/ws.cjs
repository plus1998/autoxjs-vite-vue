const { WebSocketServer } = require('ws');
const { v4 } = require('uuid');
const { EventEmitter } = require('events');

const eventEmitter = new EventEmitter();

let wss;
let host;
const clients = new Map();

const init = () => {
    // 创建 WebSocket 服务器
    wss = new WebSocketServer({ port: 9317 });
    // 监听连接事件
    wss.on('connection', (ws, req) => {
        host = req.headers.host.split(':')[0];
        ws.on('message', (msg) => {
            const message_id = v4();
            const { type, data } = JSON.parse(msg.toString());
            if (type === 'hello') {
                let response = {
                    message_id,
                    data: "连接成功",
                    type: 'hello'
                };
                if (data.appVersionCode >= 629) {
                    response.data = 'ok';
                }
                ws.send(JSON.stringify(response));
                eventEmitter.emit('connected', message_id);
                clients.set(message_id, ws);
            }
            if (data.log) {
                console.log('[remote]', data.log);
            }
        });
        // 监听连接断开事件
        ws.on('close', () => {
            console.log('Client disconnected.');
        });
    });

}

const saveOrRunProject = (clientId, project, md5, buffer, action) => {
    console.log('发送项目', project, md5, buffer.length);
    const client = clients.get(clientId);
    if (!client) {
        console.log('没有已连接的设备');
        return;
    }
    // 发送项目文件
    client.send(buffer)
    // 发送事件
    const data = {
        type: 'bytes_command',
        message_id: v4(),
        md5,
        data: {
            'id': project,
            'name': project,
            'command': action,
        }
    }
    client.send(JSON.stringify(data))
}

const stopAllScript = (clientId) => {
    console.log('停止所有脚本');
    const client = clients.get(clientId);
    if (!client) {
        console.log('没有已连接的设备');
        return;
    }
    // 发送事件
    const data = {
        type: 'command',
        message_id: v4(),
        data: {
            'command': 'stopAll'
        }
    }
    client.send(JSON.stringify(data))
}

const getHost = () => {
    return host;
}

module.exports = {
    clients,
    eventEmitter,
    init,
    saveOrRunProject,
    stopAllScript,
    getHost
}
