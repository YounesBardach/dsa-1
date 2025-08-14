<p align="center">
  <img src="https://i.postimg.cc/C1p8n606/Chat-GPT-Image-Aug-13-2025-09-23-43-PM.png" alt="DSA Practice Banner (Linked List & BST)" width="900" />
</p>

<div align="center">

## Data Structures Practice (JavaScript)

Minimal implementations of a singly Linked List and a balanced Binary Search
Tree (BST), built for The Odin Project to practice core data structures and
traversals.

![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?logo=javascript&logoColor=000)
![Data Structure: Linked List](https://img.shields.io/badge/Data%20Structure-Linked%20List-1f6feb)
![Data Structure: BST](https://img.shields.io/badge/Data%20Structure-BST-1f6feb)
![Status: Learning Project](https://img.shields.io/badge/Status-Learning%20Project-00b894)

</div>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Usage](#usage)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)

## About

This repository contains two small JavaScript implementations used to practice
classic data structures. Built for The Odin Project.

- Linked List: `linked-list.js`
- Balanced Binary Search Tree: `bst.js`

Lessons:

- Linked Lists —
  [https://www.theodinproject.com/lessons/javascript-linked-lists](https://www.theodinproject.com/lessons/javascript-linked-lists)
- Binary Search Trees —
  [https://www.theodinproject.com/lessons/javascript-binary-search-trees](https://www.theodinproject.com/lessons/javascript-binary-search-trees)

## Features

- **Linked List (singly)**: `append`, `prepend`, `size`, `head`, `tail`,
  `at(index)`, `pop`, `contains(value)`, `find(value)`, `toString()`,
  `insertAt(value, index)`, `removeAt(index)`
- **Balanced BST**:
  - Build balanced tree from an array (dedup + sort) via `buildTree`
  - `insert(value)` and `deleteItem(value)` with standard BST cases
  - `find(value)`
  - Traversals: level order (iterative and recursive), pre‑order, in‑order,
    post‑order
  - `height(node)`, `depth(node)`, `isBalanced()`
  - `rebalance()` to rebuild from in‑order traversal
  - `prettyPrint()` for console visualization

## Requirements

- Modern browser (for `linked-list.html` / `bst.html`) or
- Node.js 18+ (any modern LTS works; ES modules not required here)

## Quick start

Browser:

```bash
# Open the HTML file(s) in your browser and check DevTools console
xdg-open linked-list.html   # Linux
open linked-list.html       # macOS
start linked-list.html      # Windows

xdg-open bst.html           # or open the BST page
```

Node:

```bash
node linked-list.js   # runs the demo code at the bottom of the file

# For BST, open a Node REPL or run a small script using the factory:
node -e "const {readFileSync}=require('fs');eval(readFileSync('bst.js','utf8'));const tree=treeBuilder([1,7,4,23,8,9,4,3,5,7,9,67,6345,324]);console.log(tree.prettyPrint());"
```

## Usage

### Linked List

```js
// In browser (via <script src="linked-list.js">) or Node
const list = linkList();
list.prepend(3);
list.append(5);
list.append(8);
console.log(list.size()); // -> 3
console.log(list.head); // -> first node
console.log(list.tail); // -> last node
console.log(list.at(1)); // -> node at index 1
console.log(list.contains(5)); // -> true
console.log(list.find(8)); // -> index of value 8
console.log(list.toString()); // -> (3) -> (5) -> (8) -> null
```

### Balanced BST

```js
// In browser (via <script src="bst.js">) or Node
const tree = treeBuilder([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(tree.prettyPrint());
tree.insert(20);
tree.deleteItem(8);

const node69 = tree.find(69); // may be null if not present
console.log(node69);

// Traversals
const inOrderValues = [];
tree.inOrder((n) => inOrderValues.push(n.data));
console.log(inOrderValues);

console.log(tree.isBalanced());
const rebalanced = tree.rebalance();
console.log(rebalanced.isBalanced());
```

## Tech stack

- **Language:** Vanilla JavaScript
- **Runtime:** Browser or Node.js

## Project structure

```
dsa-1/
├─ linked-list.html   # Loads the linked list script; open and check the console
├─ linked-list.js     # Linked list factory + demo usage
├─ bst.html           # Loads the BST script; open and check the console
├─ bst.js             # Balanced BST factory and utilities
└─ README.md          # This file
```
