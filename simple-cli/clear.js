#!/usr/bin/env node
const rm = require('rimraf').sync
const path = require('path')
const chalk = require('chalk')

const downloadTemp = path.join(__dirname, '.download-temp')

rm(downloadTemp)
console.log(chalk.green('缓存清除成功'))