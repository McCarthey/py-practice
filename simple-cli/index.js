#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const commander = require('commander')
const inquirer = require('inquirer')
const glob = require('glob')
const download = require('download-git-repo')
const ora = require('ora')
const generator = require('./generator')
const CFonts = require('cfonts')
const chalk = require('chalk')

commander.usage('<project-name>').parse(process.argv)
const projectName = commander.rawArgs[2] // 获取项目名称
console.log("Your project's name is", projectName)

if (!projectName) commander.help()

const downloadTemp = path.join(__dirname, '.download-temp')

// 下载 github/gitlab 模板
function downloadTemplate() {
  return new Promise((res, rej) => {
    const url = '' // git 模板下载
    const spinner = ora(`正在下载项目模板，源地址：${url}`)
    spinner.start();

    download(url, downloadTemp, { clone: true }, (err) => {
      if (err) {
        spinner.fail()
        rej(err)
      }
      else {
        // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
        spinner.succeed()
        res(downloadTemp)
      }
    })
  })
}


// TODO: 目录判断、创建逻辑完善，考虑重名等情况
function main() {
  CFonts.say(projectName, {
    font: 'block',
    align: 'left',
    gradient: ['cyan', 'red'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '20',
  });
  downloadTemplate().then(res => {
    return inquirer.prompt([
      {
        name: 'projectName',
        message: '项目的名称',
        default: projectName
      }, {
        name: 'projectVersion',
        message: '项目的版本号',
        default: '1.0.0'
      }, {
        name: 'projectDescription',
        message: '项目的简介',
        default: `A project named ${projectName}`
      }
    ]).then(res => ({
      metadata: res,
      downloadTemp,
    }))
  }).then(res => {
    return generator(res)
  }).then(context => {
    console.log(chalk.green('\n创建成功, 执行以下命令开始Coding!\n'))
    console.log(chalk.yellowBright('cd ' + projectName + '\nnpm install\nnpm start'))
  }).catch(err => {
    console.error(err)
    console.log(err);
    console.error(chalk.red(`创建失败：${err.message}`))
    console.error(chalk.bgRedBright('建议执行 mycli clear 命令清除缓存后重试'))
  })
}

main()
