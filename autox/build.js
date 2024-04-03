import cp from "child_process";

// autox ts build
cp.execSync("tsc --project autox/tsconfig.json", {
    stdio: "inherit"
});

// 复制project文件
cp.execSync("cp autox/project/* autox/build/", {
    stdio: "inherit"
})