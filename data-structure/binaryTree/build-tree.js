/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null
  const root = new TreeNode(preorder[0], null, null)
  const rootInorderIndex = inorder.findIndex(v => v === root.val)
  const leftTreeLength = rootInorderIndex
  root.left = buildTree(preorder.slice(1, 1 + leftTreeLength), inorder.slice(0, leftTreeLength))
  root.right = buildTree(preorder.slice(1 + leftTreeLength), inorder.slice(rootInorderIndex + 1))
  return root
};
// @lc code=end

