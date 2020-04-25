/**
 * 链表的测试用例
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}
const h1 = new ListNode(1)
const h2 = new ListNode(2)
const h3 = new ListNode(3)
const h4 = new ListNode(4)
const h5 = new ListNode(5)
h1.next = h2
h2.next = h3
h3.next = h4
h4.next = h5