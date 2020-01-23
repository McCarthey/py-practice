/**
 * leetcode no.141 判断链表是否有环
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (!head || !head.next) return false
  let slow = head
  let fast = head.next
  while (slow !== fast) {
    if (!fast || !fast.next) return false
    slow = slow.next
    fast = fast.next.next
  }
  return true
}
