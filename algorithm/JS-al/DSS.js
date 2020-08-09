/**
 * 树的深度优先遍历
 * 
 * function Node(val) {
 *    this.val = val
 *    this.children = []
 * }
 */
function DFS(node) {
  const nodeList = []
  if (node) {
    const stack = []
    stack.push(node)
    while (stack.length) {
      const item = stack.pop()
      nodeList.push(item.val)
      const children = item.children
      for (let i = children.length - 1; i >= 0; i--) { // 要逆序入栈
        stack.push(children[i])
      }
    }
  }
  return nodeList
}
/**
 * test: 
 * <div>
 *  <ul>
 *    <li>
 *      <a>
 *        <img />
 *      </a>
 *    </li>
 *    <li>
 *      <span />
 *    </li>
 *  </lu>
 *  <p />
 *  <button />
 * </div>
 */
let test = {
  val: 'div',
  children: [{
    val: 'ul',
    children: [{
      val: 'li',
      children: [
        {
          val: 'a', children: [
            {
              val: 'img', children: []
            }]
        },
        {
          val: 'li', children: [
            {
              val: 'span', children: []
            }]
        },
        {
          val: 'li', children: []
        }
      ]
    }]
  },
  {
    val: 'p', children: []
  },
  {
    val: 'button', children: []
  }
  ]
}

DFS(test) // ["div", "ul", "li", "a", "img", "li", "span", "li", "p", "button"]