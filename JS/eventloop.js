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
            resp.send(article)
            console.log('Got an article')
        })
    console.log('Now is fetching an article')
}

function print() {
    console.log('Print something')
}

app.listen('5000')
/**
 * 一个事件循环(EventLoop)中会有一个正在执行的任务(Task)，而这个任务是从macrotask队列中来的。当这个macrotask执行结束后所有可用的microtask将会在同一个事件循环中执行，当这些microtask执行结束后还能继续天际microtask一直到整个microtask队列执行结束
 * 
 * 基本来说，当我们想要以同步的方式来处理异步任务时候就用microtask，其他情况用macrotask
 * 
 * - 一个事件循环(event loop)会有一个或多个任务队列(task queue) task queue 就是 macrotask queue
 * - 每一个event loop 都有一个microtask queue
 * - task queue == macrotask queue != microtask queue
 * - 一个任务 task 可以放入 macrotask queue 也可以放入 microtask queue 中
 * - 当一个 task 被放入队列 queue(macro或micro) 那这个 task 就可以被立即执行了
 */