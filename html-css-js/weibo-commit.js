// 随机评论
function randomComment(arr) {
  const index = Math.floor(Math.random() * arr.length)
  console.log(index, arr[index])
  return arr[index]
}

// 点击发送评论
function sendComment(textarea, comments, sendBtn) {
  textarea.value = randomComment(comments) + timeStr()
  sendBtn.click()
}

// 评论加上当前时间，防止重复
function timeStr() {
  const dateNow = new Date()
  const year = dateNow.getFullYear()
  const month = dateNow.getMonth() + 1
  const date = dateNow.getDate()
  const hour = dateNow.getHours()
  const mins = dateNow.getMinutes()
  const seconds = dateNow.getSeconds()
  const dateStr = `于${year}-${month}-${date} ${hour}:${mins}:${seconds}`
  return dateStr
}

// 取消网络繁忙提示框
function cancelBusyModal() {
  if($('.W_layer.W_translateZ')) {

  }
}

function start() {
  const comments = ['test1', 'test2', 'test3', 'test4', 'test5']

  const textarea = $('.WB_feed_repeat textarea.W_input')
  const sendBtn = $('.WB_feed_repeat .btn.W_fr a')

  setInterval(() => {
    sendComment(textarea, comments, sendBtn)
  }, 2000)
}

start()


// 获取打开的评论列表
var commentList = $('.list_box .list_ul')
for (let i = 0; i < commentList.children.length; i++) {
  console.log(commentList.children[i])
  let child = commentList.children[i]
  child
  // 如果是博主评论的 点赞、回复

  // 如果是博主回复的评论，也点赞、回复
}

// 引入jquery CDN
function getJQ() {
  const scriptTag = document.createElement('script')
  scriptTag.src = 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js'
  const head = document
    .getElementsByTagName('head')
    .item(0);
  head.appendChild(scriptTag);
}



// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       https://github.com/McCarthey
// @match        https://www.weibo.com/u/1779876472?profile_ftype=1&is_ori=1
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    const divs = $('div[tbinfo="ouid=1779876472]"')
    // id=1779876472 用于测试
    // 先滚动到底部 翻页后 再滚动到底部 -> 即翻页两次后 回到顶部 开始遍历：
    // 遍历所有 [tbinfo="ouid=<ouid>"]的div
    console.log('divs', divs)
    async function scrollToBottom(t1, t2) {
        await setTimeout(() => {
            $('html, body, .content').animate({ scrollTop: $(document).height() }, 300);
        }, t1)
        await setTimeout(() => {
            $('html, body, .content').animate({ scrollTop: $(document).height() }, 300);
        }, t2)
    }
    await scrollToBottom(1000, 6000)
    await setTimeout(() => {
        $('html, body, .content').animate({ scrollTop: 0 }, 300);
        // 开始遍历
    }, 12000)
    // Your code here...
})();