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

const testArray = [
  40, 100, 1, 5, 25, 10, 40, 100, 1, 5, 25, 10, 10, 10, 11, 12, 9, 46,
]
const testNode = myTree.buildTree(testArray)

prettyPrint(testNode)


// let myArray = []
// const myFunc = (node) => {
//   myArray.push(myTree.depth(node.data))
// }

// console.log(myTree.inorder(myFunc))
// console.log(myArray)
console.log(myTree.isBalanced())
