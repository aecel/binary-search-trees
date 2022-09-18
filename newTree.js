import newNode from "./newNode.js"

const newTree = () => {
  let root

  const getRoot = () => root

  // Sorts and removes duplicates of an array
  const fixArray = (array) => {
    array.sort((a, b) => {
      return a - b
    })

    const newArray = array.filter((v, i, a) => a.indexOf(v) === i)

    return newArray
  }

  // Takes a sorted array
  // Turns it into a balanced binary search tree
  const arrayToBST = (array, start, end) => {
    if (start > end) return null
    const middle = Math.round((start + end) / 2)
    const node = newNode({ data: array[middle] })
    node.left = arrayToBST(array, start, middle - 1)
    node.right = arrayToBST(array, middle + 1, end)
    return node
  }

  // Turn array into a balanced binary tree of Node objects
  // Returns level-0 root node
  const buildTree = (array) => {
    const myArray = fixArray(array)
    root = arrayToBST(myArray, 0, myArray.length - 1)
    return root
  }

  const find = (value) => {
    let currentNode = root

    while (currentNode) {
      if (currentNode.data == value) return currentNode
      if (currentNode.data > value) {
        currentNode = currentNode.left
      } else if (currentNode.data < value) {
        currentNode = currentNode.right
      }
    }
    return null
  }

  const isALeaf = (node) => {
    if (!node) return false
    if (node.left == null && node.right == null) return true
    return false
  }

  const insert = (value) => {
    let currentNode = root

    while (currentNode) {
      if (currentNode.data == value) {
        console.log("Node already exists")
        console.log("You can't do that, okay?")
        return null
      }
      if (isALeaf(currentNode)) {
        if (currentNode.data > value) {
          currentNode.left = newNode({ data: value })
          return null
        } else if (currentNode.data < value) {
          currentNode.right = newNode({ data: value })
          return null
        }
      }

      if (currentNode.data > value) {
        if (currentNode.left) {
          currentNode = currentNode.left
        } else {
          currentNode.left = newNode({ data: value })
          return null
        }
      } else if (currentNode.data < value) {
        if (currentNode.right) {
          currentNode = currentNode.right
        } else {
          currentNode.right = newNode({ data: value })
          return null
        }
      }
    }

    console.log("Current node is null which is impossible")
    console.log("Sucks for you")
    return null
  }

  const deleteNode = (value) => {
    let currentNode = root

    while (currentNode) {
      if (currentNode.left.data == value) {
        if (currentNode.left.left == null) {
          currentNode.left = currentNode.left.right
          return null
        } else if (currentNode.left.right == null) {
          currentNode.left = currentNode.left.left
          return null
        } else {
          // Insert code here for deleting a node with two children
        }
      } else if (currentNode.right.data == value) {
        if (currentNode.right.left == null) {
          currentNode.right = currentNode.right.right
          return null
        } else if (currentNode.right.right == null) {
          currentNode.right = currentNode.right.left
          return null
        } else {
          // Insert code here for deleting a node with two children
        }
      }
      if (currentNode.data > value) {
        currentNode = currentNode.left
      } else if (currentNode.data < value) {
        currentNode = currentNode.right
      }
    }

    console.log("No matching node found")
    return null
  }

  const levelOrder = (func) => {
    let q = [root]
    let dataArray = []

    while (q.length != 0) {
      const currentNode = q[0]

      if (func) {
        func(currentNode)
      }
      dataArray.push(currentNode.data)

      if (currentNode.left != null) {
        q.push(currentNode.left)
      }
      if (currentNode.right != null) {
        q.push(currentNode.right)
      }

      q.shift()
    }

    return dataArray
  }

  const preorder = (func) => {
    let currentNode = root
    let dataArray = []

    const loop = (currentNode) => {
      if (!currentNode) return
      if (func) {
        func(currentNode)
      }
      dataArray.push(currentNode.data)
      loop(currentNode.left)
      loop(currentNode.right)
    }

    loop(currentNode)
    return dataArray
  }

  const inorder = (func) => {
    let currentNode = root
    let dataArray = []

    const loop = (currentNode) => {
      if (!currentNode) return

      loop(currentNode.left)
      if (func) {
        func(currentNode)
      }
      dataArray.push(currentNode.data)
      loop(currentNode.right)
    }

    loop(currentNode)
    return dataArray
  }

  const postorder = (func) => {
    let currentNode = root
    let dataArray = []

    const loop = (currentNode) => {
      if (!currentNode) return

      loop(currentNode.left)
      loop(currentNode.right)
      if (func) {
        func(currentNode)
      }
      dataArray.push(currentNode.data)
    }

    loop(currentNode)
    return dataArray
  }

  const max = (a, b) => {
    if (a >= b) return a
    return b
  }

  const height = (node) => {
    if (!node) return 0
    const leftHeight = height(node.left)
    const rightHeight = height(node.right)
    return max(leftHeight, rightHeight) + 1
  }

  const depth = (data) => {
    const getLevelUtil = (node, data, level) => {
      if (!node) return 0
      if (node.data == data) return level
      let downLevel = getLevelUtil(node.left, data, level + 1)
      if (downLevel != 0) return downLevel

      downLevel = getLevelUtil(node.right, data, level + 1)
      return downLevel
    }

    const getLevel = (node, data) => {
      return getLevelUtil(node, data, 0)
    }

    return getLevel(root, data)
  }

  const isBalanced = () => {
    let diffArray = []
    const heightDiff = (node) => {
      const heightLeft = height(node.left)
      const heightRight = height(node.right)
      diffArray.push(Math.abs(heightLeft - heightRight))
    }

    inorder(heightDiff)

    for (const num of diffArray) {
      if (num > 1) {
        return false
      }
    }
    return true
  }

  const rebalance = () => {
    const numArray = inorder()
    return buildTree(numArray)
  }

  return {
    getRoot,
    buildTree,
    find,
    insert,
    deleteNode,
    levelOrder,
    preorder,
    inorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  }
}

export default newTree
