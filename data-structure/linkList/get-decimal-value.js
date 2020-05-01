/**
 * leetcode NO.1290. 二进制链表转整数
 * 
 * 给你一个单链表的引用结点 head。链表中每个结点的值不是 0 就是 1。已知此链表是一个整数数字的二进制表示形式。
 * 请你返回该链表所表示数字的 十进制值 。
 * 示例:
 * 输入：head = [1,0,1]
 * 输出：5
 * 
 * 输入：head = [1,0,0,1,0,0,1,1,1,0,0,0,0,0,0]
 * 输出：18880
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
 * @return {number}
 */

// 遍历链表，根据进制转换方法进行计算
function getDecimalValue(head) {
  let result = 0
  let cur = head
  while (cur) {
    result = result * 2 + cur.val
    cur = cur.next
  }

  return result
}