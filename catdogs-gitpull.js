const express = require('express')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const app = express()
const port = 3001

app.get('/', async function (req, res) {
    await exec('cd /usr/code/web-build/ && sudo git pull')
    await exec('sudo cp -r /usr/code/web-build/catdogs /home')
    res.send('git pull successfully!')
})

app.listen(3001, () => console.log('git pulling...'))