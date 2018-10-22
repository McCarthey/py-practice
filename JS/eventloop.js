/**
 * 虽然V8是单线程的，但底层的C++ API却不是。当我们执行一些非阻塞的操作，Node会调用一些代码（libuv），与引擎里js代码同时执行。一旦这个隐藏的线程收到了等到的返回值或者抛出一个异常，之前提供的回调函数就会执行
 */
const express = require('express')
const superagent = require('superagent')
const app = express()

app.get('/', getArticle)

function getArticle(req, res) {
    fetchArticle(req, res)
    print()
}

const aids = [4564824, 4506868, 4767667, 4856099, 7456996]

function fetchArticle(req, resp) {
    const aid = aids[Math.floor(Math.random() * aids.length)]
    superagent.get(`http://news-at.zhihu.com/api/4/news/${aid}`)
        .end((err, res) => {
            if (err) {
                console.log('error...')
                return res.status(500).send('an error...')
            }
            const article = res.body
            console.log(article)
            resp.send(article)
            console.log('Got an article')
        })
    console.log('Now is fetching an article')
}

function print() {
    console.log('Print something')
}

app.listen('5000')