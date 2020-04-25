/**
 * leetcode No.876. 链表的中间结点
 * 给定一个头结点为 head 的非空单链表，返回链表的中间结点。
 * 如果有两个中间结点，则返回第二个中间结点。
 * 
 * 示例 1：
 * 输入：[1,2,3,4,5]
 * 输出：此列表中的结点 3 (序列化形式：[3,4,5])
 * 
 * 示例 2：
 * 输入：[1,2,3,4,5,6]
 * 输出：此列表中的结点 4 (序列化形式：[4,5,6])
 */

// 遍历 + 额外数组
function middleNode(head) {
  const array = []
  let cur = head
  while (cur) {
    array.push(cur.val)
    cur = cur.next
  }
  let midIndex = Math.floor(array.length / 2)
  cur = head
  while (midIndex > 0) {
    cur = cur.next
    midIndex--
  }
  return cur
}

// 抛弃数组，使用数字计数的单指针法
function middleNodePoint(head) {
  let num = 1
  let cur = head
  while (cur) {
    cur = cur.next
    num++
  }
  cur = head
  let k = 1
  while (k < num / 2) {
    cur = cur.next
    k++
  }
  return cur
}

// 快慢双指针法，快指针一次走两步（注意判断尾节点），慢指针一次走一步
function middleNodeTwoPoint(head) {
  let slow = head
  let fast = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}