import cp from "child_process";
import fs from "fs";

// 项目文件
import chokidar from "chokidar";
import { FileObserver } from '../modules/diff.cjs';

// 连接设备
import {
    clients,
    eventEmitter,
    init,
    saveOrRunProject,
    stopAllScript,
    getHost
} from '../modules/ws.cjs';
import path from "path";

import { copyDir, packProject } from "../modules/util.cjs";

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const projectName = packageJson.name;

const folder = '../autox/build/development';
const fileObserver = new FileObserver(folder);

// project
const runProject = async (clientId) => {
    // 更新js中的host
    const mainJSPath = path.join(targetDir, 'main.js');
    console.log('更新主机host', getHost());
    fs.writeFileSync(mainJSPath, fs.readFileSync(mainJSPath).toString('utf-8').replace('localhost', getHost()), 'utf-8');
    // 打包项目
    const { buffer, md5 } = await packProject(fileObserver);
    saveOrRunProject(clientId, projectName, md5, buffer, 'run_project');
}

// ws
eventEmitter.on('connected', async (clientId) => {
    // 设备连接 运行项目
    await runProject(clientId)
})
// 初始化
init();

// 检查 build/dev 目录
if (!fs.existsSync("autox/build/development")) {
    console.log("build/development 目录不存在，创建中……");
    fs.mkdirSync("autox/build/development", { recursive: true });
    console.log("创建完成");
}

// 复制project文件
const sourceDir = 'project/development';
const resourcesDir = 'project/resources';
const targetDir = 'autox/build/development';

copyDir(sourceDir, targetDir)
copyDir(resourcesDir, targetDir)

// 监听autox文件变动
chokidar.watch("autox/**/*.ts", {
    ignored: /types/,
}).on("all", async (event, filename) => {
    if (filename) {
        console.log(`File ${filename} has been ${event}!`);
        // autox ts build
        try {
            cp.execSync("tsc --project autox/tsconfig.json --outDir autox/build/development/modules", {
                stdio: "inherit"
            });
            console.log('已连接设备', clients.size);
            if (clients.size) {
                // 全部发送项目
                for (const clientId of clients.keys()) {
                    await stopAllScript(clientId);
                    await runProject(clientId);
                }
            }
        } catch (error) {
            console.log('编译错误', error);
        }
    }
});