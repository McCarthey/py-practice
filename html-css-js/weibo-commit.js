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