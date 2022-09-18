import newTree from "./newTree.js"

// Prints binary search tree with the root node as input
// (from the odin project)
// Put root as your node input
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
  }
}

const myTree = newTree()

// randomly generated N = 10 length array 0 <= A[N] <= 99
const testArray = Array.from({length: 10}, () => Math.floor(Math.random() * 100))
const testNode = myTree.buildTree(testArray)

prettyPrint(testNode)
console.log(myTree.isBalanced())
console.log(myTree.levelOrder())
console.log(myTree.preorder())
console.log(myTree.inorder())
console.log(myTree.postorder())
myTree.insert(101)
myTree.insert(102)
myTree.insert(103)
myTree.insert(104)
prettyPrint(testNode)
console.log(myTree.isBalanced())
const newNode = myTree.rebalance()
prettyPrint(newNode)
console.log(myTree.isBalanced())
console.log(myTree.levelOrder())
console.log(myTree.preorder())
console.log(myTree.inorder())
console.log(myTree.postorder())
