/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
var preorderTraversal = function (root) {
  const result = []
  const preorder = (root) => {
    if (!root) {
      return
    }
    result.push(root.val)
    preorder(root.left)
    preorder(root.right)
  }
  preorder(root)
  return result
};

/** 迭代版 */
const preorderTraversalIterator = function (root) {
  const result = []
  const stack = []
  let current = root
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      result.push(current.val)
      current = current.left
    }
    current = stack.pop()
    current = current.right
  }
  return result
}
