const fs = require('fs')
const os = require('os')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
exec('git pull', (err, stdout, stderr) => {
  console.log('组件打包结果：', stdout)
  if (stdout.includes('up to')) {
    console.log('[哦吼]')
  }
  console.log('组件打包报错：', stderr)
})