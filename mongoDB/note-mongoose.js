const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const compression = require('compression')

const config = require('./config')

/**
 * 本文件仅仅用来练习 mongoose 的使用，因此只保留了几个接口/路由，
 * 同时也去除了 cookie-session 机制，因操作 username: Randall 的文档
 */

/**
 * 连接mongoDB
 */

mongoose.connect(`${config.dbUrl}/note`)
const db = mongoose.connection
const Schema = mongoose.Schema

/** 1.可以定义子Schema，最好指定子Schema的 _id: false，否则会在子文档中自动被添加_id属性
 *  2.定义Schema时可以指定 collection: 'XXX' 来给collection命名，或者可以直接访问该名称的collection
 */

const noteSchema = new Schema({
    id: String,
    content: String,
    done: Boolean
}, { _id: false })

const userSchema = new Schema({
    username: String,
    password: String,
    uid: String,
    notes: [noteSchema],
}, { collection: 'test' })


const UserModel = mongoose.model('test', userSchema)


const port = 8771
const server = app.listen(port, () => {
    console.log(`Server on port http://localhost:${port}/!`)
})


const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://mccarthey.top');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};


app.use(allowCrossDomain) //运用跨域的中间件
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 检查是否已经登录过
app.get('/checklogin', (req, res) => {
    const islogin = checkLoginStatus(req, res)
    if (islogin) {
        res.send({
            code: 0,
            msg: 'you have logged in'
        });
    }
});

// 获取用户数据
app.get('/getNotes', (req, res) => {
    const isLogin = checkLoginStatus(req, res)
    if (!isLogin) return false
    UserModel.findOne({ username: 'Randall' }, 'notes', function (err, user) {
        console.log(user)
        res.send({
            code: 0,
            data: user.notes,
            msg: 'success'
        })
    })
})

app.post('/create', async (req, res) => {
    const isLogin = checkLoginStatus(req, res)
    if (!isLogin) return false
    const { id, content, done } = req.body
    UserModel.updateOne({ username: 'Randall' }, { $push: { notes: { id, content, done } } }, function (err, result) {
        res.send({
            code: 0,
            msg: 'success',
        })
    })
})

// 删除单条数据
app.post('/delete/:noteId', async (req, res) => {
    const isLogin = checkLoginStatus(req, res)
    if (!isLogin) return false
    const noteId = req.params.noteId

    UserModel.updateOne({ username: 'Randall' }, {
        $pull: { notes: { id: noteId } },
    }, function (err, result) {
        res.send({
            code: 0,
            msg: 'success',
        })
    })
})

// 检查登录状态
function checkLoginStatus(req, res) {
    return true
}

