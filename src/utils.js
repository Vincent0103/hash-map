const node = (key, value, next = null) => ({ key, value, next });

const calculateLoadFactor = (buckets, length) => length() / buckets.length;

const getIndex = (key, buckets, hash, hadLengths) => {
  let index;
  let currentNode;
  let foundIndex = null;
  hadLengths.forEach((bucketLength) => {
    index = hash(key, bucketLength);
    currentNode = buckets[index];
    while (currentNode) {
      if (key === currentNode.key) {
        foundIndex = index;
        return;
      }
      currentNode = currentNode.next;
    }
  });
  return foundIndex;
};

const getNode = (key, buckets) => {
  let foundItem = null;
  buckets.filter((item) => item?.key).forEach((item) => {
    let currentItem = item;
    while (currentItem) {
      if (key === currentItem.key) {
        foundItem = currentItem;
        break;
      }
      currentItem = currentItem.next;
    }
  });
  return foundItem;
};

const getPastNode = (key, buckets) => {
  let foundItem = null;
  buckets.filter((item) => item?.key).forEach((item) => {
    let currentItem = item;
    while (currentItem && currentItem.next) {
      if (currentItem.next && key === currentItem.next.key) {
        foundItem = currentItem;
        break;
      }
      currentItem = currentItem.next;
    }
  });
  return foundItem;
};

const getAllNodes = (buckets) => {
  let currentNode;
  const nodes = [];
  buckets.forEach((item) => {
    currentNode = item;
    while (currentNode) {
      if (currentNode?.key) nodes.push(currentNode);
      currentNode = currentNode.next;
    }
  });
  return nodes;
};

export {
  node, calculateLoadFactor, getIndex, getNode, getPastNode, getAllNodes,
};
