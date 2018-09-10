/**
* 定义无限点击的函数
* @param {string} ele: dom元素
* @param {number} int: 间隔时间(ms)
* */
function infinteClick(ele, int) {
  setInterval(() => {
    const btn = document.querySelector(ele)
    btn.click()
  }, int)
}

infinteClick('applause_btn[data-id="1673681"]', 100)

function infinteClick(ele, int) {
  setInterval(() => {
    btnTest.click()
    console.log('clicked')
  }, 10)
}

const btnTest = document.querySelector('.applause_btn[data-id="1673681"]');
const btnTest2 = document.querySelector('.applause_btn[data-id="1641315"]');
const btnTest3 = document.querySelector('.applause_btn[data-id="1571292"]');
const btnTest4 = document.querySelector('.applause_btn[data-id="1673819"]');
setInterval(() => {
  btnTest.click();
  btnTest2.click();
  btnTest3.click();
  btnTest4.click();
  console.log('clicked');
}, 10);



const playerIds = [1673681];
const playerBtns = [];
function getPlayers() {
  for (let i = 0; i < playerIds.length; i++) {
    playerBtns.push(document.querySelector(`.applause_btn[data-id="${playerIds[i]}"]`))
  }
};
getPlayers();
setInterval(() => {
  playerBtns.forEach(btn => {
    btn.click()
  })
}, 5);

// 自动取消弹窗
setInterval(() => {
  try {
    document
      .querySelector('#livecheck')
      .click()
  } catch (e) {
    console.log('没有弹窗')
  }
}, 1000);