const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
// const compression = require('compression')
const morgan = require('morgan')
const MongoStore = require('connect-mongo')(session);
const crypto = require('crypto')

const config = require('./config')

/**
 * 连接mongoDB
 */

mongoose.connect(`${config.dbUrl}/note`)
const db = mongoose.connection
const Schema = mongoose.Schema

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
// app.use(cookieParser()) // use cookie-parser
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

// // 注册
// app.post('/signup', async (req, res) => {
//     let data = req.body
//     const isexisted = await checkusername(data.username)
//     if (isexisted) {
//         res.send({
//             code: 101,
//             msg: 'username already exists'
//         })
//     } else {
//         const md5 = crypto.createhash('md5')
//         const pwdmd5 = md5.update(data.password).digest('hex') // 得到加密后的密码
//         const uid = generateid(data.username)
//         const dbresult = await db.collection('users').insertone({
//             username: data.username,
//             password: pwdmd5,
//             uid,
//             notes: []
//         })
//         res.send({
//             code: 0,
//             msg: 'success!'
//         })
//     }
// })

// // 登录
// app.post('/login', async (req, res) => {
//     let data = req.body
//     const isexisted = await checkusername(data.username)
//     if (!isexisted) {
//         res.send({
//             code: 102,
//             msg: 'no such user, please sign up first'
//         })
//     } else {
//         const md5 = crypto.createhash('md5')
//         const pwdmd5 = md5.update(data.password).digest('hex') // 得到加密后的密码
//         const dbresult = await db.collection('users').findone({
//             username: data.username,
//         })
//         // console.log(dbresult.username)
//         const { username, password, uid } = dbresult
//         if (password === pwdmd5) {
//             req.session.login = 'logged'
//             res.cookie('uid', uid, { maxage: 7 * 24 * 60 * 60 * 1000 })
//             res.send({
//                 code: 0,
//                 msg: 'login successfully'
//             })
//         } else {
//             res.send({
//                 code: 103,
//                 msg: 'invalid username or password'
//             })
//         }
//     }
// })

// // 退出登录
// app.post('/logout', async (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             res.send({
//                 code: 998,
//                 msg: 'log out failed'
//             })
//             return
//         }
//         res.clearcookie('uid')
//         res.send({
//             code: 0,
//             msg: 'log out successfully'
//         })
//     })
// })

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

// // 更新单条数据状态
// app.post('/update/:noteId', async (req, res) => {
//     const isLogin = checkLoginStatus(req, res)
//     if (!isLogin) return false
//     const noteId = req.params.noteId
//     const { done } = req.body
//     try {
//         const uid = req.cookies.uid
//         const dbResult = await db.collection('users').updateOne(
//             { uid, "notes.id": noteId },
//             {
//                 $set: { "notes.$.done": done },
//                 $currentDate: { lastModified: true }
//             }
//         )
//         res.send({
//             code: 0,
//             msg: 'success',
//         })
//     } catch (e) {
//         res.send({
//             code: 202,
//             msg: 'Post data failed'
//         })
//     }
// })

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

// // 更新用户数据
// app.post('/updateNotes', async (req, res) => {
//     const isLogin = checkLoginStatus(req, res)
//     if (!isLogin) return false
//     let { notes } = req.body
//     try {
//         const uid = req.cookies.uid
//         const dbResult = await db.collection('users').updateOne(
//             { uid },
//             {
//                 $set: { notes },
//                 $currentDate: { lastModified: true }
//             }
//         )
//         res.send({
//             code: 0,
//             msg: 'success',
//         })
//     } catch (e) {
//         res.send({
//             code: 202,
//             msg: 'Post data failed'
//         })
//     }
// })

// app.get('/test', (req, res) => {
//     res.send({
//         code: 0,
//         msg: 'Hello this is a test'
//     })
// })

// // 检查用户名
// async function checkUsername(username) {
//     let queryRes = await db.collection('users').find({ username }).toArray()
//     let isExisted = queryRes.some(i => {
//         return i.username === username
//     })
//     return isExisted
// }

// 生成唯一的userId
function generateId(data) {
    const hash = crypto.createHash('sha256')
    hash.update(data)
    return hash.digest('hex')
}

// 检查登录状态
function checkLoginStatus(req, res) {
    return true
}

