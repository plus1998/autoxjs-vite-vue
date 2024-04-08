import cp from "child_process";
import fs from "fs";
import path from "path";
import crypto from 'crypto';

// 打包
import archiver from 'archiver';
import { WritableStreamBuffer } from 'stream-buffers';
import { FileObserver } from '../modules/diff.cjs';

const folder = '../autox/build/production';
const fileObserver = new FileObserver(folder);

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const projectName = packageJson.name;

// project
const packProject = async () => {
    const changedFiles = await fileObserver.walk();
    console.log(changedFiles);
    const zip = archiver('zip');
    const streamBuffer = new WritableStreamBuffer();
    zip.pipe(streamBuffer);
    changedFiles.forEach(relativePath => {
        zip.append(fs.createReadStream(path.join(fileObserver.dir, relativePath)), { name: relativePath });
    });
    await zip.finalize();
    const buffer = streamBuffer.getContents() || Buffer.alloc(0);
    const md5 = crypto.createHash('md5').update(buffer).digest('hex');
    return {
        buffer,
        md5
    };
}

const saveProject = async (clientId) => {
    const { buffer, md5 } = await packProject();
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
const targetDir = 'autox/build/production';

const files = fs.readdirSync(sourceDir);
for (const file of files) {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);
    fs.copyFileSync(sourceFile, targetFile);
    console.log('File copied:', file);
}

console.log('打包完成, 连接设备即可自动保存项目。');
console.log('请连接设备，按 Ctrl + C 退出。');

console.log('\n项目路径：autox/build/production');