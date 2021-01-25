const fs = require('fs')
const os = require('os')
const util = require('util');
const exec = util.promisify(require('child_process').exec);


exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
  console.log('git 分支结果', stdout, stdout.split(''))
  // if (stdout.includes('test')) {
  console.log('[哦吼是test分支，拉代码！]')
  exec('git pull', (e, sto, ste) => {
    console.log('[git pull结果]', sto)
  })
  return
  // }
})

// exec('git branch', (err, stdout, stderr) => {
//   console.log('组件打包结果：', stdout)
//   if (stdout.includes('test')) {
//     console.log('[哦吼]')
//   }
//   console.log('组件打包报错：', stderr)
// })