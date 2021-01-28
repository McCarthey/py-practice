const exec = require('child_process').exec


exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
  console.log('git 分支结果', stdout, stdout.split(''))
  // if (stdout.includes('test')) {
  // console.log('[哦吼是test分支，拉代码！]')
  // exec('git ci -m "[test], another commit"', (e, sto, ste) => {
  //   console.log('[git commit报错]', e)
  //   console.log('[git commit报错]', sto)
  // })
  exec('git add .', (e, sto, ste) => {
    console.log('[git add报错]', e)
    console.log('[git add结果]', sto)
    console.log('[git add sterr]', ste)
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