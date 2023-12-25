const fs = require('fs');

// 从 package.json 读取当前版本
const packageJson = require('../../package.json');
const appVersion = packageJson.version;

/**
 * @description 增量更新版本号
 * @param {string} version 版本号
 * @returns {string} 新版本号
 */
function incrementVersion(version) {
    const versionArray = version.split('.');
    const [major, minor, patch] = versionArray;

    // 检查补丁版本是否为 9，然后增量更新次版本号
    if (parseInt(patch) === 9) {
        const newMinor = parseInt(minor) + 1;
        return `${major}.${newMinor}.0`;
    }

    // 增量更新次版本号
    const newPatch = parseInt(patch) + 1;
    return `${major}.${minor}.${newPatch}`;
}

// 调用 incrementVersion 函数计算新版本号
const newVersion = incrementVersion(appVersion);

// 基于新版本号更新 package.json
packageJson.version = newVersion;
fs.writeFileSync('../../package.json', JSON.stringify(packageJson, null, 2), {
    encoding: 'utf-8',
});

// 基于新版本号创建 meta.json
const metaJson = { version: newVersion, oldVersion: appVersion };
fs.writeFileSync('../../public/json/meta.json', JSON.stringify(metaJson, null, 2), {
    encoding: 'utf-8',
});

// 打印日志，表明版本更新完毕
console.log('updated success', metaJson);
