"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileObserver = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class FileObserver {
    constructor(dirPath, filter = (() => true)) {
        this.files = new Map();
        this.dir = path.join(__dirname, '../', '../', 'autox', dirPath);
        this.filter = filter;
    }
    walk() {
        return new Promise((resolve, reject) => {
            const changedFiles = [];
            this.getFiles(this.dir, changedFiles, reject);
            resolve(changedFiles);
        });
    }
    getFiles(rootPath, fileList, reject) {
        let files;
        try {
            files = fs.readdirSync(rootPath, { withFileTypes: true });
        }
        catch (error) {
            reject(error);
            return;
        }
        for (const dirent of files) {
            const filePath = path.join(rootPath, dirent.name);
            const relativePath = path.relative(this.dir, filePath);
            if (dirent.isDirectory()) {
                this.getFiles(filePath, fileList, reject); // 递归调用处理目录
            }
            else if (dirent.isFile()) {
                const stats = fs.statSync(filePath);
                if (this.filter(relativePath, filePath, stats)) {
                    const millis = stats.mtime.getTime();
                    if (!this.files.has(filePath) || this.files.get(filePath) !== millis) {
                        this.files.set(filePath, millis);
                        fileList.push(relativePath);
                    }
                }
            }
        }
    }
}
exports.FileObserver = FileObserver;