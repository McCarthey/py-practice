/*
 * @lc app=leetcode.cn id=232 lang=javascript
 *
 * [232] 用栈实现队列
 */

// @lc code=start
/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
  this.stackAdd = []
  this.stackDelete = []

};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  while (this.stackDelete.length) {
    const element = this.stackDelete.pop()
    this.stackAdd.push(element)
  }
  this.stackAdd.push(x)
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  while (this.stackAdd.length) {
    const element = this.stackAdd.pop()
    this.stackDelete.push(element)
  }
  return this.stackDelete.pop()
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  while (this.stackAdd.length) {
    const element = this.stackAdd.pop()
    this.stackDelete.push(element)
  }
  return this.stackDelete[this.stackDelete.length - 1]
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return !(this.stackAdd.length + this.stackDelete.length)
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
// @lc code=end

