/**
 * 剑指 Offer 06. 从尾到头打印链表
 * 
 * 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
 * 输入：head = [1,3,2]
 * 输出：[2,3,1]
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
// 使用unshift插入数组
function consoleFromTailToHead(head) {
  let cur = head
  const result = []
  while (cur) {
    result.unshift(cur.val)
    cur = cur.next
  }

  return result
}

// 借助于栈，遍历链表，依次入栈后再出栈
function consoleFromTailToHeadWithStack(head) {
  let cur = head
  const stack = []
  const result = []
  while (cur) {
    stack.push(cur.val)
    cur = cur.next
  }
  while (stack.length) {
    const val = stack.pop()
    result.push(val)
  }
  return result
}