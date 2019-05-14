const express = require('express')
const path = require('path')
const app = express()

const bodyParser = require('body-parser')
const session = require('express-session')
const crypto = require('crypto')


/**
 * 连接mongodb，将数据库对象存放在全局变量db中
 */
const MongoClient = require('mongodb').MongoClient
const url = '' // 不暴露服务器地址和mongodb端口
let db

MongoClient.connect(url, (err, client) => {
    db = client.db('note')
})

const port = 8770
const server = app.listen(port, () => {
    console.log(`Server on port http://localhost:${port}/!`)
})


const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://mccarthey.top');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
   
app.use(allowCrossDomain);//运用跨域的中间件
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'random key',
    name: 'note_app_sid',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
})) // using session

// 检查是否已经登录过
app.get('/checkLogin', (req, res) => {
    if (req.session.login) {
        res.send({
            code: 0,
            msg: 'You have logged in'
        });
    } else {
        res.send({
            code: 999,
            msg: 'Please log in first'
        });
    }
});

// 注册
app.post('/signUp', async (req, res) => {
    let data = req.body
    const isExisted = await checkUsername(data.username)
    if (isExisted) {
        res.send({
            code: 101,
            msg: 'Username already exists'
        })
    } else {
        const md5 = crypto.createHash('md5')
        const pwdMd5 = md5.update(data.password).digest('hex') // 得到加密后的密码
        const uid = generateId(data.username)
        const dbResult = await db.collection('users').insertOne({
            username: data.username,
            password: pwdMd5,
            uid
        })
        res.send({
            code: 0,
            msg: 'Success!'
        })
    }
})

// 登录
app.post('/login', async (req, res) => {
    let data = req.body
    const isExisted = await checkUsername(data.username)
    if (!isExisted) {
        res.send({
            code: 102,
            msg: 'No such user, please sign up first'
        })
    } else {
        const md5 = crypto.createHash('md5')
        const pwdMd5 = md5.update(data.password).digest('hex') // 得到加密后的密码
        const dbResult = await db.collection('users').findOne({
            username: data.username,
        })
        // console.log(dbResult.username)
        const { username, password, uid } = dbResult
        if (password === pwdMd5) {
            req.session.login = 'Logged'
            res.cookie('uid', uid)
            res.send({
                code: 0,
                msg: 'Login successfully'
            })
        } else {
            res.send({
                code: 103,
                msg: 'Invalid username or password'
            })
        }
    }
})

// 退出登录
app.post('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send({
                code: 998,
                msg: 'log out failed'
            })
            return
        }
        res.clearCookie('uid')
         res.send({
             code: 0,
             msg: 'Log out successfully'
         })
    })
})

app.get('/test', (req, res) => {
    res.send({
        code: 0,
        msg: 'Hello this is a test'
    })
})

// 检查用户名
async function checkUsername(username) {
    let queryRes = await db.collection('users').find({ username }).toArray()
    let isExisted = queryRes.some(i => {
        return i.username === username
    })
    return isExisted
}

// 生成唯一的userId
function generateId(data) {
    const hash = crypto.createHash('sha256')
    hash.update(data)
    return hash.digest('hex')
}
