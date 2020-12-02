/**
 * 给定一个二叉树，返回它的 中序 遍历。
 * 递归版本很简单，能用迭代实现吗
 */

/**递归 */
function inorderTraversalRecursive(root, array) {
  if (root) {
    inorderTraversalRecursive(root.left, array)
    array.push(root.val)
    inorderTraversalRecursive(root.right, array)
  }
  return array
}

/*使用栈的迭代版本，显示维护一个栈结构 */
function inorderTraversal(root) {
  let current = root
  const stack = []
  const result = []
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    result.push(current.val)
    current = current.right
  }
  return result
}