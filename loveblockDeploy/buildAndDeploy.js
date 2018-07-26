#!/usr/bin/env node

const { exec } = require('child_process')
const fse = require('fs-extra')
const fs = require('fs')
const path = require('path')

// yarn run build-dev -e ddd
const argvs = process.argv.slice(2)
const mode = argvs[0] // 第一个参数: dev 测试环境包; build 正式环境包; test 测试环境包 不上传至git
const entry = argvs[1] || 'ddd' // 第二个参数： 入口名称 [ddd, user]

if (mode !== 'build' && mode !== 'dev' && mode !== 'test') {
    throw new Error('第一个参数必须是 build、 dev 或 test ')
}

let buildCommand
if (mode === 'build') {
    buildCommand = `yarn run build -e ${entry}`
} else {
    buildCommand = `yarn run build-dev -e ${entry}`
}

console.log(`正在执行${buildCommand}命令 请稍候`)

exec(buildCommand, (err, stdout, stderr) => {
    // 打包后的回调
    if (err) throw err
    console.log(stdout)
    console.log(stderr)
    const distDir = path.join(process.cwd(), '/dist')
    const distHtml = path.join(distDir, `${entry}.html`)
    const distSW = path.join(distDir, 'service-worker.js')
    // console.log(distHtml)
    // 访问父级目录
    const parentDir = path.resolve(__dirname, '..')
    // 访问loveblockWeb目录
    const loveblockWebDir = path.join(parentDir, 'loveblockweb/')
    // console.log(distDir)
    // 访问loveblockWeb/htmlroot(test)目录
    let lbHtmlDir
    let lbSW
    if (mode === 'build') {
        lbHtmlDir = path.join(loveblockWebDir, `htmlroot/${entry}.html`)
        lbSW = path.join(loveblockWebDir, 'htmlroot/service-worker.js')
    } else {
        lbHtmlDir = path.join(loveblockWebDir, `htmlroottest/${entry}.html`)
        lbSW = path.join(loveblockWebDir, 'htmlroottest/service-worker.js')
    }
    // console.log(lbHtmlDir)
    // 将dist/中的html文件复制到loveblockWeb/htmlroottest目录
    fse.copySync(distHtml, lbHtmlDir, { overwrite: true })
    fse.copySync(distSW, lbSW, { overwrite: true })

	// git提交
    if (mode === 'test') throw new Error('用于测试的包不上传至git')

    const gitCommand = `git st && git add . && git ci -m "${mode} ${+new Date()}" && git push`

    exec(
        gitCommand, {
            cwd: '../loveblockweb/'
        },
        (gitErr, gitStdout, gitStderr) => {
            if (gitErr) {
                console.log('没有可以更新的内容')
                throw new Error('停止执行')
            }
            console.log(gitStdout)
            console.log(gitStderr)
            console.log('git push 完成')

            // 如果是正式环境 需要两个get请求才能更新成功
            if (mode === 'build') {
                exec('curl http://normal1.loveblock.one:9100')
                exec('curl http://normal2.loveblock.one:9100')
            }
        }
    )
})