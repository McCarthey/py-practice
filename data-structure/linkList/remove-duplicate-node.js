/**
 * 面试题 02.01. 移除重复节点
 * 编写代码，移除未排序链表中的重复节点。保留最开始出现的节点。
 * 
 * 示例1:
 * 输入：[1, 2, 3, 3, 2, 1]
 * 输出：[1, 2, 3]
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
function removeDuplicateNode(head) {
  let cur = head
  const map = { [cur.val]: true }
  while (cur.next) {
    if (!map[cur.next.val]) {
      map[cur.next.val] = true
      cur = cur.next
    } else {
      cur.next = cur.next.next
    }
  }
  return head
}