const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const crypto = require('crypto');
const { WritableStreamBuffer } = require('stream-buffers');

const copyDirAndFiles = (source, target) => {
    if (fs.lstatSync(source).isDirectory()) {
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }
        const files = fs.readdirSync(source);
        for (const file of files) {
            const sourceFile = path.join(source, file);
            const targetFile = path.join(target, file);
            copyDirAndFiles(sourceFile, targetFile);
        }
    } else {
        fs.copyFileSync(source, target);
    }
}

const packProject = async (fileObserver) => {
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

const copyDir = (sourceDir, targetDir) => {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    const files = fs.readdirSync(sourceDir);
    for (const file of files) {
        if (fs.statSync(path.join(sourceDir, file)).isDirectory()) {
            copyDir(path.join(sourceDir, file), path.join(targetDir, file));
            continue;
        }
        const sourceFile = path.join(sourceDir, file);
        const targetFile = path.join(targetDir, file);
        fs.copyFileSync(sourceFile, targetFile);
        console.log('File copied:', file);
    }
}

module.exports = {
    packProject,
    copyDirAndFiles,
    copyDir
}