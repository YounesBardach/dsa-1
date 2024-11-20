const treeBuilder = (array) => {
  //Object to be returned:

  let treeObject = {};

  //Node builder:

  treeObject.node = (data, left = null, right = null) => {
    if (data === null) {
      return null;
    }
    return { data, left, right };
  };

  //Tree builder:

  treeObject.buildTree = (arr = array) => {
    //Remove duplicate values:

    const noDuplicateArray = [...new Set(arr)];

    //Array sorter (mergeSort algo):

    const mergeSortAlgo = (arr = []) => {
      if (arr.length < 2) {
        return arr; // Base case: Array is already sorted or has only one element
      }

      const mid = Math.floor(arr.length / 2); // Find the middle index
      const leftArray = arr.slice(0, mid); // Left half of the array
      const rightArray = arr.slice(mid); // Right half of the array

      // Recursively sort the left and right halves
      const sortedLeft = mergeSortAlgo(leftArray);
      const sortedRight = mergeSortAlgo(rightArray);

      // Merge the two sorted arrays
      return mergeSortedArrays(sortedLeft, sortedRight);
    };

    const mergeSortedArrays = (arrayLeft, arrayRight) => {
      let sortedArray = [];

      // Merge the two sorted arrays
      while (arrayLeft.length && arrayRight.length) {
        if (arrayLeft[0] < arrayRight[0]) {
          sortedArray.push(arrayLeft.shift()); // Take the smaller element
        } else {
          sortedArray.push(arrayRight.shift()); // Take the smaller element
        }
      }

      // Concatenate the remaining elements from either array
      return [...sortedArray, ...arrayLeft, ...arrayRight];
    };

    //Sorted array result:

    const sortedArray = mergeSortAlgo(noDuplicateArray);
    // Alternative: const sortedArray = [...new Set(array)].sort((a, b) => a - b)

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
  };

  //Tree root:

  treeObject.root = treeObject.buildTree();

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

  treeObject.insert = (value, currentNode = treeObject.root) => {
    // If the tree is empty, insert the first node as root
    if (currentNode === null && treeObject.root === null) {
      treeObject.root = treeObject.node(value); // Assign to root only once
      return;
    }

    // If currentNode is null but treeObject.root is set, this will be handled by recursion

    if (currentNode === null) {
      return treeObject.node(value); // Return the newly created node
    }

    if (currentNode.data === value) {
      return; //duplicates check
    }

    if (value < currentNode.data) {
      currentNode.left = treeObject.insert(value, currentNode.left);
    } else if (value > currentNode.data) {
      currentNode.right = treeObject.insert(value, currentNode.right);
    } //recursive insertion

    return currentNode; //return the updated node to the previous call stack level
  };

  //Node remover:

  treeObject.deleteItem = (value, currentNode = treeObject.root) => {
    //empty tree or value not found
    if (!currentNode) return null;
    //subtrees updates
    if (value < currentNode.data) {
      currentNode.left = treeObject.deleteItem(value, currentNode.left);
    } else if (value > currentNode.data) {
      currentNode.right = treeObject.deleteItem(value, currentNode.right);
    } else {
      // Node found
      // One or no child: make parent point to null or the existing child
      if (!currentNode.left && !currentNode.right) return null; // No children
      if (!currentNode.left) return currentNode.right; // One child (right)
      if (!currentNode.right) return currentNode.left; // One child (left)
      // Two children:
      // find the in-order successor (smallest node in the right subtree)
      let successor = currentNode.right;
      while (successor.left) successor = successor.left;
      // replace node by successor and delete successor
      currentNode.data = successor.data;
      currentNode.right = treeObject.deleteItem(
        successor.data,
        currentNode.right
      );
    }
    return currentNode;
  };

  //Node finder:

  treeObject.find = (value, currentNode = treeObject.root) => {
    if (!currentNode || currentNode.data === value) return currentNode;

    return value < currentNode.data
      ? treeObject.find(value, currentNode.left)
      : treeObject.find(value, currentNode.right);
  };

  //Level order traversal (breadth-first) iteration:

  treeObject.levelOrderIteration = (callback) => {
    if (!callback) throw new Error("A callback function is required.");

    const queue = [treeObject.root];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback(currentNode);

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
  };

  //Level order traversal recursion:

  treeObject.levelOrderRecursion = (callback, queue = [treeObject.root]) => {
    if (queue.length === 0) return; // Base case: If the queue is empty, stop the recursion.

    const currentNode = queue.shift(); // Get the first node in the queue
    callback(currentNode); // Process the node with the callback function

    // Add the children to the queue for future processing
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);

    // Recursively call the function with the updated queue
    treeObject.levelOrderRecursion(callback, queue);
  };

  //Preorder traversal (depth-first, root-left-right):

  treeObject.preOrder = (callback, currentNode = treeObject.root) => {
    if (!callback) throw new Error("A callback function is required.");
    if (!currentNode) return;

    callback(currentNode);
    treeObject.preOrder(callback, currentNode.left);
    treeObject.preOrder(callback, currentNode.right);
  };

  //Inorder traversal (depth-first, left-root-right):

  treeObject.inOrder = (callback, currentNode = treeObject.root) => {
    if (!callback) throw new Error("A callback function is required.");
    if (!currentNode) return;

    treeObject.inOrder(callback, currentNode.left);
    callback(currentNode);
    treeObject.inOrder(callback, currentNode.right);
  };

  //Postorder traversal (depth-first, right-root-left):

  treeObject.postOrder = (callback, currentNode = treeObject.root) => {
    if (!callback) throw new Error("A callback function is required.");
    if (!currentNode) return;

    treeObject.postOrder(callback, currentNode.left);
    treeObject.postOrder(callback, currentNode.right);
    callback(currentNode);
  };

  //Node height:

  treeObject.height = (node = treeObject.root) => {
    if (!node) return -1;
    return (
      1 + Math.max(treeObject.height(node.left), treeObject.height(node.right))
    );
  };

  //Node depth:

  treeObject.depth = (
    node = treeObject.root,
    currentNode = treeObject.root,
    currentDepth = 0
  ) => {
    if (!currentNode || !node) return -1;
    if (currentNode === node) return currentDepth;

    return node.data < currentNode.data
      ? treeObject.depth(node, currentNode.left, currentDepth + 1)
      : treeObject.depth(node, currentNode.right, currentDepth + 1);
  };

  //Balance check:

  treeObject.isBalanced = (node = treeObject.root) => {
    if (!node) return true;

    const leftHeight = treeObject.height(node.left);
    const rightHeight = treeObject.height(node.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      treeObject.isBalanced(node.left) &&
      treeObject.isBalanced(node.right)
    );
  };

  // Optimized isBalanced function (O(n) instead of O(n^2))
  // function isBalanced(node = root) {
  //   function checkHeightAndBalance(node) {
  //     if (!node) return 0;
  //     const leftHeight = checkHeightAndBalance(node.left);
  //     if (leftHeight === -1) return -1;
  //     const rightHeight = checkHeightAndBalance(node.right);
  //     if (rightHeight === -1) return -1;
  //     if (Math.abs(leftHeight - rightHeight) > 1) return -1;
  //     return 1 + Math.max(leftHeight, rightHeight);
  //   }
  //   return checkHeightAndBalance(node) !== -1;
  // }

  //Balance tree:

  treeObject.rebalance = () => {
    const nodes = [];
    treeObject.inOrder((node) => nodes.push(node.data)); // Collect all nodes in-order
    return treeBuilder(nodes); // Rebuild the tree
  };

  //Return the built tree object:

  return treeObject;
};

// Test arrays:

// const arraySampleOne = [1];
// const arraySampleTwo = [1, 7];
// const arraySampleThree = [1, 7, 4, 23, 8, 9, 4, 8, 15, 69, 45, 78, 1, 5, 55];
// const arraySampleFour = [];
// const arraySampleFive = [1, 2, 3, 4, 5, 6, 7, 8];

// Factory function tests:

// const tree = treeBuilder(arraySampleThree);
// console.log(tree);
// console.log(tree.prettyPrint(tree.root));
// tree.insert(20);
// tree.deleteItem(8);
// console.log(tree.find(69));
// console.log(tree.find(999));
// console.log(tree.root);
// console.log(tree.prettyPrint(tree.root));
// console.log(tree.height(tree.find(5)));
// console.log(tree.depth(tree.find(23)));
// console.log(tree.isBalanced())
// tree.insert(79);
// tree.insert(80);
// tree.insert(81);
// console.log(tree.prettyPrint(tree.root));
// console.log(tree.isBalanced())
// const newBalancedTree = tree.rebalance()
// console.log(tree.prettyPrint(newBalancedTree.root));
// console.log(newBalancedTree.isBalanced())

//Callback methods tests:

// const testLevelOrderIteration = () => {
//   const tree = treeBuilder(arraySampleThree);
//   const result = [];

//   // Callback to capture node data
//   const captureNodeData = (node) => {
//     result.push(node.data);
//   };

//   // Call levelOrderIteration with the callback
//   tree.levelOrderIteration(captureNodeData);

//   // The result should contain the node data in level order
//   console.log("Level-Order Iteration Test:");
//   console.log(result); // Expected output: [1, 4, 7, 8, 9, 15, 23, 45, 55, 69, 78]
// };

// testLevelOrderIteration();

// const testLevelOrderRecursion = () => {
//   const tree = treeBuilder(arraySampleThree);
//   const result = [];

//   // Callback to capture node data
//   const captureNodeData = (node) => {
//     result.push(node.data);
//   };

//   // Call levelOrderRecursion with the callback
//   tree.levelOrderRecursion(captureNodeData);

//   // The result should contain the node data in level order
//   console.log("Level-Order Recursion Test:");
//   console.log(result); // Expected output: [1, 4, 7, 8, 9, 15, 23, 45, 55, 69, 78]
// };

// testLevelOrderRecursion();

// const testPreOrderTraversal = () => {
//   const tree = treeBuilder(arraySampleThree);
//   const result = [];

//   // Callback to capture node data
//   const captureNodeData = (node) => {
//     result.push(node.data);
//   };

//   // Call preOrder with the callback
//   tree.preOrder(captureNodeData);

//   // The result should contain the node data in pre-order
//   console.log("Pre-Order Traversal Test:");
//   console.log(result); // Expected output: [1, 4, 7, 8, 9, 15, 23, 45, 55, 69, 78]
// };

// testPreOrderTraversal();

// const testInOrderTraversal = () => {
//   const tree = treeBuilder(arraySampleThree);
//   const result = [];

//   // Callback to capture node data
//   const captureNodeData = (node) => {
//     result.push(node.data);
//   };

//   // Call inOrder with the callback
//   tree.inOrder(captureNodeData);

//   // The result should contain the node data in in-order
//   console.log("In-Order Traversal Test:");
//   console.log(result); // Expected output: [1, 4, 7, 8, 9, 15, 23, 45, 55, 69, 78]
// };

// testInOrderTraversal();

// const testPostOrderTraversal = () => {
//   const tree = treeBuilder(arraySampleThree);
//   const result = [];

//   // Callback to capture node data
//   const captureNodeData = (node) => {
//     result.push(node.data);
//   };

//   // Call postOrder with the callback
//   tree.postOrder(captureNodeData);

//   // The result should contain the node data in post-order
//   console.log("Post-Order Traversal Test:");
//   console.log(result); // Expected output: [1, 7, 4, 9, 8, 15, 23, 55, 45, 78, 69]
// };

// testPostOrderTraversal();
