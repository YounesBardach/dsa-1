const linkList = () => {
  const listObject = {};
  listObject.head = null;
  listObject.tail = null;
  listObject.node = (value = null, nextNode = null) => {
    return { value, nextNode };
  };
  listObject.prepend = (value) => {
    const newFirstNode = listObject.node(value);
    if (!listObject.head) {
      listObject.tail = newFirstNode;
    }
    newFirstNode.nextNode = listObject.head;
    listObject.head = newFirstNode;
    return newFirstNode;
  };
  listObject.append = (value) => {
    let newLastNode = listObject.head;

    if (newLastNode === null) {
      listObject.head = listObject.node(value);
      return listObject.node(value);
    } else {
      while (newLastNode.nextNode) {
        newLastNode = newLastNode.nextNode;
      }
      newLastNode.nextNode = listObject.node(value);
      listObject.tail = newLastNode.nextNode;
    }
  };

  listObject.size = () => {
    let count = 0;
    let counter = listObject.head;
    while (counter) {
      counter = counter.nextNode;
      count++;
    }
    return count;
  };
  listObject.at = (index) => {
    let nodeIndex = 0;
    let indexer = listObject.head;
    if (index === 0) {
      return indexer;
    }
    if (
      index <= -1 ||
      index === undefined ||
      index === null ||
      indexer === null
    ) {
      return null;
    }

    for (nodeIndex; nodeIndex < index; nodeIndex++) {
      if (indexer !== null) {
        indexer = indexer.nextNode;
      }
    }
    return indexer;
  };

  listObject.pop = () => {
    let secondLastNode = listObject.head;
    if (secondLastNode === null) {
      return null;
    }
    while (secondLastNode.nextNode.nextNode !== null) {
      secondLastNode = secondLastNode.nextNode;
    }
    secondLastNode.nextNode = null;
    listObject.tail = secondLastNode;
  };

  listObject.contains = (value) => {
    let valueHolderNode = listObject.head;
    if (!valueHolderNode) {
      return false;
    }
    while (valueHolderNode) {
      if (valueHolderNode.value === value) {
        return true;
      }
      valueHolderNode = valueHolderNode.nextNode;
    }
    return false;
  };
  listObject.find = (value) => {
    let nodeIndex = 0;
    let indexer = listObject.head;
    if (!indexer) {
      return null;
    }
    while (indexer) {
      if (indexer.value === value) {
        return nodeIndex;
      }
      indexer = indexer.nextNode;
      nodeIndex++;
    }
    return null;
  };
  listObject.toString = () => {
    let NodePrinter = listObject.head;
    let Print = ``;
    if (!NodePrinter) {
      return null;
    }
    if (listObject.size() === 1) {
      Print = `(${NodePrinter.value}) -> null`;
      return Print;
    }
    while (NodePrinter) {
      Print += `(${NodePrinter.value}) -> `;
      NodePrinter = NodePrinter.nextNode;
    }
    Print += `null`;
    return Print;
  };
  listObject.insertAt = (value, index) => {
    if (!listObject.at(index)) {
      return;
    }
    let insertedNode = listObject.at(index);
    let newNextNode = listObject.node(
      insertedNode.value,
      insertedNode.nextNode
    );
    insertedNode.value = value;
    insertedNode.nextNode = newNextNode;
  };
  listObject.removeAt = (index) => {
    if (!listObject.at(index)) {
      return;
    }
    if (index === 0) {
      listObject.head = listObject.head.nextNode;
    } else {
      let removedNode = listObject.at(index);
      let replacementNode = listObject.at(index - 1);
      replacementNode.nextNode = removedNode.nextNode;
      listObject.tail = replacementNode;
    }
    removedNode = null;
  };
  return listObject;
};

const newList = linkList();

newList.prepend(3);
newList.append(5);
newList.append(6);
newList.append(8);
newList.append(9);
newList.append(10);
newList.append(12);
newList.pop();
newList.insertAt("x", 1);
newList.removeAt(0);

console.log(newList);
console.log(newList.size());
console.log(newList.at(1));
console.log(newList.contains(3));
console.log(newList.find(8));
console.log(newList.head);
console.log(newList.tail);
console.log(newList.toString());
