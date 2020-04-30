/**
 * leetcode NO.237 删除链表中的节点
 * 示例:
 * 输入：head = [4,5,1,9], node = 5
 * 输出: [4,1,9]
 */


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */

// 即复制后继结点的值、next指针，删除后继结点（狸猫换太子）
function deleteNode(node) {
  let next = node.next
  if (!next) return
  node.val = next.val
  node.next = next.next
  next = null
}