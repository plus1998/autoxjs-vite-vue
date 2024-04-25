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
    stopAllScript
} from '../modules/ws.cjs';

import { copyDir, packProject } from "../modules/util.cjs";

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const projectName = packageJson.name;

const folder = '../autox/build/development';
const fileObserver = new FileObserver(folder);

// project
const runProject = async (clientId) => {
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
const targetDir = 'autox/build/development';

copyDir(sourceDir, targetDir)

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
                console.log(clients.keys());
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