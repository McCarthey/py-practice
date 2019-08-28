#!/usr/bin/env node

const fs = require('fs')
const os = require('os')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readline = require('readline')
const { stdout, stderr } = await exec('npm run build-all') // 将组件库打包
console.log('组件打包结果：', stdout)
console.log('组件打包报错：', stderr)


const writeFileStream = fs.createWriteStream('./package-new.json') // 创建可写流

const rl = readline.createInterface({
    input: fs.createReadStream('./package.json'), // 按行读取package.json
});

rl.on('line', (line) => {
    if (line.includes("version")) {              // 版本 + 1
        const newVerLine = getNewVer(line)
        writeFileStream.write(newVerLine + os.EOL)
    } else {
        writeFileStream.write(line + os.EOL)
    }
});

rl.on('close', () => {
    console.log('close')                         // 结束后替换旧的package.json 并发布
    await exec('rm -f ./package.json && mv ./package-new.json ./package.json && npm publish')
})

function getNewVer(versionLine) {              // 版本 + 1函数 仅适用于'X.X.X'形式
    let verStr = versionLine.split('"').filter(item => item.includes('.'))[0]
    let num = verStr.split('.').map(s => s.length < 2 ? '0' + s : s).join('')
    let newVer = String(Number(num) + 1)
    newVer = newVer.length === 5 && ('0' + newVer)
    newVer = [Number(newVer.slice(0, 2)), Number(newVer.slice(2, 4)), Number(newVer.slice(4, 6))].join('.')
    const newVerLine = `"version": "${newVer}",`
    return newVerLine
}