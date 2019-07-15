const fs = require('fs')
const dotenv = require('dotenv')
const env = dotenv.config().parsed
let envStr = ''
for (const key in env) {
    envStr += `\t\t\t\t'process.env.${key}': '"${env[key]}"',\n`
}
const data = fs.readFileSync('./next.config.js', 'utf8').split('\n')
data.splice(data.length - 6, 0, envStr)
fs.writeFileSync('./next.config.js', data.join('\n'), 'utf8')