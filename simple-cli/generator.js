const Metalsmith = require('metalsmith') // 插值
const Handlebars = require('handlebars') // 模版
const rm = require('rimraf').sync // 删除
const fs = require("fs")
const path = require("path")

module.exports = function (context) {
  // console.log('[generator]', context)
  const metadata = context.metadata
  const src = context.downloadTemp; // 暂时存放文件目录
  const dest = './' + context.metadata.projectName; //项目的根目录

  return new Promise((resolve, reject) => {
    const metalsmith = Metalsmith(process.cwd())
      .metadata(metadata) // 将用户输入信息放入
      .clean(false)
      .source(src)
      .destination(dest);

    metalsmith.use((files, metalsmith, done) => {
      const meta = metalsmith.metadata()
      Object.keys(files).forEach(fileName => {
        if (fileName === "package.json") { // 目前只对 package.json 进行插值操作
          const t = files[fileName].contents.toString()
          files[fileName].contents = new Buffer.from(Handlebars.compile(t)(meta), 'UTF-8')
        }
      })
      done()
    }).build(err => {
      rm(src);
      err ? reject(err) : resolve(context);
    })
  })
}