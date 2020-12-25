/**
 * leetcode NO.26 反转一个单链表
 * 示例:
 * 输入: 1->2->3->4->5->NULL
 * 输出: 5->4->3->2->1->NULL
 *
 * 你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
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
 * @return {ListNode}
 */
// 迭代法，保存后继结点，断开链接，链接前序结点，移动指针
function reverseLinkedList(head) {
  let cur = head
  let prev = null
  while (cur !== null) {
    let temp = cur.next
    cur.next = prev
    prev = cur
    cur = temp
  }
  return prev // 注意不要返回cur, 因为结束时，cur是null
}

// *递归法 难想
function reverseLinkedListRecursive(head) {
  if (!head || !head.next) return head
  let next = head.next
  let reverseHead = reverseLinkedListRecursive(next)
  head.next = null
  next.next = head
  return reverseHead
}

// 尾递归
function reverseLinkedListTail(head) {
  function handleReverse(prev, cur) {
    if (!cur) return prev
    let next = cur.next
    cur.next = prev
    return handleReverse(cur, next)
  }
  if (!head || !head.next) return head
  return handleReverse(null, head)
}
