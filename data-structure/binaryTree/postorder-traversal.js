/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  const result = []
  const postorder = (root) => {
    if (!root) {
      return
    }
    postorder(root.left)
    postorder(root.right)
    result.push(root.val)
  }
  postorder(root)
  return result
};

/** 迭代版 */
const postorderTraversalIterator = function (root) {
  const stack = []
  const result = []
  let current = root
  let prev = null
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    if (!current.right || current.right === prev) {
      result.push(current.val)
      prev = current
      current = null
    } else {
      stack.push(current)
      current = current.right
    }
  }

  return result
}
