import cp from "child_process";
import fs from "fs";

// 打包
import { FileObserver } from '../modules/diff.cjs';
import { copyDir, packProject } from "../modules/util.cjs";

const folder = '../autox/build/production';
const fileObserver = new FileObserver(folder);

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const projectName = packageJson.name;

const saveProject = async (clientId) => {
    const { buffer, md5 } = await packProject(fileObserver);
    saveOrRunProject(clientId, projectName, md5, buffer, 'save_project');
}

// 连接设备
import {
    eventEmitter,
    init,
    saveOrRunProject,
} from '../modules/ws.cjs';
// ws
eventEmitter.on('connected', async (clientId) => {
    // 设备连接 运行项目
    await saveProject(clientId)
})
// 初始化
init();

// 检查 build/production 目录
if (!fs.existsSync("autox/build/production")) {
    console.log("build/production 目录不存在，创建中……");
    fs.mkdirSync("autox/build/production", { recursive: true });
    console.log("创建完成");
}

// autox ts build
cp.execSync("tsc --project autox/tsconfig.json --outDir autox/build/production/modules", {
    stdio: "inherit"
});

// 复制project文件
const sourceDir = 'project/production';
const resourcesDir = 'project/resources';
const targetDir = 'autox/build/production';

copyDir(sourceDir, targetDir)
copyDir(resourcesDir, targetDir)

console.log('打包完成, 连接设备即可自动保存项目。');
console.log('请连接设备，按 Ctrl + C 退出。');

console.log('\n项目路径：autox/build/production');