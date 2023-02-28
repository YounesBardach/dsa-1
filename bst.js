const treeBuilder = (array) => {
  //Object to be returned:
  let treeObject = {};
  //
  //Node builder:
  treeObject.node = (data, left = null, right = null) => {
    if (data === null) {
      return null;
    }
    return { data, left, right };
  };
  //
  //Tree builder:
  treeObject.buildTree = (arr = array) => {
    //Remove duplicate values:
    const noDuplicateArray = [...new Set(arr)];
    //
    //Array sorter (mergeSort algo):
    const mergeSort = (arr = arr) => {
      //twoWayMergeSort algo:
      const twoWayMergeSort = (arrayLeft, arrayRight) => {
        let sortedArray = [];

        while (arrayLeft.length && arrayRight.length) {
          if (arrayLeft[0] < arrayRight[0]) {
            sortedArray.push(arrayLeft.shift());
          } else {
            sortedArray.push(arrayRight.shift());
          }
        }

        return [...sortedArray, ...arrayLeft, ...arrayRight];
      };

      if (arr.length < 2) {
        return arr;
      }

      const mid = arr.length / 2;
      const rightArray = arr.splice(0, mid);

      return twoWayMergeSort(mergeSort(arr), mergeSort(rightArray));
    };
    //
    //Sorted array result:
    const sortedArray = mergeSort(noDuplicateArray);
    //
    //Build tree from sorted array:
    const builder = (array, start = 0, end = array.length - 1) => {
      if (start > end) return null;

      const mid = parseInt((start + end) / 2);
      const root = treeObject.node(array[mid]);

      root.left = builder(array, start, mid - 1);
      root.right = builder(array, mid + 1, end);

      return root;
    };
    return builder(sortedArray);
    //
  };
  //Tree root:
  treeObject.root = treeObject.buildTree();
  //
  //Tree printer:
  treeObject.prettyPrint = (
    node = treeObject.root,
    prefix = "",
    isLeft = true
  ) => {
    if (node === null) {
      console.log(`No tree to display`);
      return null;
    }
    if (node.right !== null) {
      treeObject.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      treeObject.prettyPrint(
        node.left,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
    return `Tree displayed above`;
  };
  //Node inserter:
  treeObject.inserter = (value, root = treeObject.root) => {
    // debugger
    if (root === null) {
      treeObject.root = treeObject.node(value);
      return;
    }
    if (root.data === value) {
      return;
    }

    if (root.left === null && root.data > value) {
      root.left = treeObject.node(value);
      return;
    }
    if (root.right === null && root.data < value) {
      root.right = treeObject.node(value);
    }
    if (root.data > value) {
      treeObject.inserter(value, root.left);
    }
    if (root.data < value) {
      treeObject.inserter(value, root.right);
    }
  };
  //
  //Node remover:
  treeObject.remover = (value, root = treeObject.root) => {
    if (root === null) {
      return root;
    } else if (root.data > value) {
      root.left = treeObject.remover(value, root.left);
    } else if (root.data < value) {
      root.right = treeObject.remover(value, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }
      if (root.right.left === null) {
        root.right.left = root.left;
        return root.right;
      } else {
        let replaceNode = root.right;
        while (replaceNode.left !== null) {
          replaceNode = replaceNode.left;
          root.data = replaceNode.data;
        }
        root.right = treeObject.remover(root.data, root.right);
      }
    }
    return root;
  };
  //
  //Node finder:
  treeObject.find = (value, root = treeObject.root) => {
    if (root === null) {
      return root;
    }
    if (value === null || value === undefined) {
      return null;
    }
    let foundNode = root;
    if (foundNode.data === value) {
      return foundNode;
    }

    if (foundNode.left === null && foundNode.data > value) {
      return null;
    }
    if (foundNode.right === null && foundNode.data < value) {
      return null;
    }
    if (foundNode.data > value) {
      foundNode = treeObject.find(value, foundNode.left);
    } else if (foundNode.data < value) {
      foundNode = treeObject.find(value, foundNode.right);
    }
    return foundNode;
  };
  //
  //Level order traversal (breadth-first) iteration:
  treeObject.levelOrderIteration = (root = treeObject.root, callback) => {
    if (root === null) {
      return null;
    }
    let queue = [root];
    let rawResult = [];
    while (queue.length) {
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        const node = queue.shift();
        rawResult.push(node.data);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        if (callback) callback(node);
      }
    }
    if (!callback) return rawResult;
  };
  //
  //Level order traversal recursion:
  treeObject.levelOrderRecursion = (
    root = treeObject.root,
    result = [],
    queue = [],
    callback
  ) => {
    if (root === null) {
      return null;
    }
    result.push(root.data);
    queue.push(root.left);
    queue.push(root.right);
    while (queue.length) {
      const node = queue.shift();
      treeObject.levelOrderRecursion(node, result, queue, callback);
    }
    if (!callback) return result;
  };
  //
  //Preorder traversal (depth-first, root-left-right):
  treeObject.preorder = (root = treeObject.root, result = [], callback) => {
    if (root === null) {
      return null;
    }
    result.push(root.data);
    if (callback) callback(root);
    if (root.left) treeObject.preorder(root.left, result, callback);
    if (root.right) treeObject.preorder(root.right, result, callback);
    if (!callback) return result;
  };
  //
  //Inorder traversal (depth-first, left-root-right):
  treeObject.inorder = (root = treeObject.root, result = [], callback) => {
    if (root === null) {
      return null;
    }
    if (root.left) treeObject.inorder(root.left, result, callback);
    result.push(root.data);
    if (callback) callback(root);
    if (root.right) treeObject.inorder(root.right, result, callback);
    if (!callback) return result;
  };
  //
  //Postorder traversal (depth-first, right-root-left):
  treeObject.postorder = (root = treeObject.root, result = [], callback) => {
    if (root === null) {
      return null;
    }
    if (root.right) treeObject.postorder(root.right, result, callback);
    result.push(root.data);
    if (callback) callback(root);
    if (root.left) treeObject.postorder(root.left, result, callback);
    if (!callback) return result;
  };
  //
  //Node height:
  treeObject.height = (node = treeObject.root) => {
    if (treeObject.root === null && node === treeObject.root) {
      return -1;
    }
    if (node === null) {
      return null;
    }

    let leftHeight = treeObject.height(node.left);
    let rightHeight = treeObject.height(node.right);
    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else return rightHeight + 1;
  };
  //
  //Node depth:
  treeObject.depth = (
    node = treeObject.root,
    root = treeObject.root,
    depth = 0
  ) => {
    if (node === root) {
      return depth;
    }
    if (root === null || node === null) {
      return;
    }
    if (node.data < root.data) {
      return treeObject.depth(node, root.left, (depth += 1));
    } else {
      return treeObject.depth(node, root.right, (depth += 1));
    }
  };
  //
  //Balance check:
  treeObject.isBalanced = (root = treeObject.root) => {
    const leftHeight = treeObject.height(root.left);
    const rightHeight = treeObject.height(root.right);
    const difference = Math.abs(leftHeight - rightHeight);
    return difference < 2 ? "true" : "false";
  };
  //
  //Balance tree:
  treeObject.rebalance = (root = treeObject.root) => {
    const newArray = treeObject.preorder(root, []);
    return (treeObject.root = treeObject.buildTree(newArray));
  };
  // treeObject.levelOrderRecursion = (
  //   root = treeObject.root,
  //   result = [],
  //   queue = [],
  //   callback
  // )
  // levelOrder(arr = [], queue = [], root = this.root)
  //
  // rebalance(root = this.root) {
  //   let arr = this.levelOrder([], [], root);
  //   arr.sort((a, b) => a - b);
  //   return this.root = buildTree(arr);
  // },
  //Return the built tree object:
  return treeObject;
  //
};

//Test arrays:
// const arraySampleOne = [1];
// const arraySampleTwo = [1, 7];
// const arraySampleThree = [1, 7, 4, 23, 8, 9, 4, 8, 15, 69, 45, 78, 1, 5, 55];
// const arraySampleFour = [];
// const arraySampleFive = [1, 2, 3, 4, 5, 6, 7, 8];
//

//Test logs:
// console.log(tree);
// const tree = treeBuilder(arraySampleThree);
// console.log(tree);
// console.log(tree.prettyPrint(tree.root));
// tree.inserter(20);
// tree.inserter(120);
// tree.inserter(119);
// tree.inserter(116);
// tree.remover(8);
// tree.remover(1);
// tree.remover(9);
// console.log(tree.find(69));
// console.log(tree.root);
// console.log(tree.prettyPrint(tree.root));
// console.log(tree.levelOrderIteration());
// console.log(tree.levelOrderRecursion());
// console.log(tree.preorder());
// console.log(tree.inorder());
// console.log(tree.postorder());
// console.log(tree.height());
// console.log(tree.depth());
// console.log(tree.isBalanced())
// console.log(tree.rebalance(tree.find(7)))
// console.log(tree.root);
// console.log(tree.prettyPrint(tree.root));

//Driver script:

const randomArrayBuilder = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};
const randomArray = randomArrayBuilder(20);
const randomTree = treeBuilder(randomArray);
console.log(randomTree);
console.log(randomTree.prettyPrint());
console.log(randomTree.isBalanced());
for (let i = 0; i < 104; i++) {
  randomTree.inserter(Math.floor(Math.random() * 100));
}
console.log(randomTree.prettyPrint());
console.log(randomTree.isBalanced());
randomTree.rebalance();
console.log(randomTree.prettyPrint());
console.log(randomTree.isBalanced());
console.log(randomTree.levelOrderIteration());
console.log(randomTree.preorder());
console.log(randomTree.inorder());
console.log(randomTree.postorder());
