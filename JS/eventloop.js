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

 
 /**
  * eventloop是一个队列（先进先出）
  * 用一个持续运行的while循环实现，循环的每一轮称为一个tick，对每个tick而言，如果在队列中有等待事件，那么就会从队列中摘下一个事件并执行，这些事件就是回调函数
  * 简化代码如下：
  */
var eventLoop = []
var event

while (true) {
    if (eventLoop.length > 0) {
        event = eventLoop.shift()
        
        try {
            event()
        }
        catch (err) {
            handleError(err)
        }
    }
}

/**
 * 注意setTimeout(...) 并没有把你的回调函数挂在事件循环队列中， 
 * 他所做的是设定一个定时器， 当定时器到时后， 环境会把你的回调函数放在事件队列中， 这样， 在未来某个时刻的tick会摘下并执行这个回调
 * 如果这时候事件循环中已经有 20 个项目了会怎样呢？ 你的回调就会等待。 
 * 它得排在其他项目后面—— 通常没有抢占式的方式支持直接将其排到队首。 这也解释了为什么 setTimeout(..) 定时器的精度可能不高。
 * 
 * HTML5标准规定了setTimeout() 的第二个参数的最小值（ 最短间隔）， 不得低于4毫秒， 如果低于这个值， 就会自动增加。 
 * 在此之前， 老版本的浏览器都将最短间隔设为10毫秒。
 * 
 * 另外， 对于那些DOM的变动（ 尤其是涉及页面重新渲染的部分）， 通常不会立即执行， 而是每16毫秒执行一次。 
 * 这时使用requestAnimationFrame() 的效果要好于setTimeout()。
 */

node中的eventloop分为6个阶段 每个阶段执行完后再执行微任务队列 然后再进入下一个阶段
