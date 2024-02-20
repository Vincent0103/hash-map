import {
  node, calculateLoadFactor, getIndex, getNode, getPastNode, getAllNodes,
} from './utils.js';

const HashSet = () => {
  const buckets = new Array(16).fill(null);
  const LOAD_FACTOR = 0.75;
  const hadLengths = [buckets.length];

  const hash = (key, bucketLength = buckets.length) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      if (hashCode > bucketLength) hashCode %= bucketLength;
    }

    return hashCode;
  };

  const length = () => buckets.filter((item) => item?.key).reduce((acc, curr) => {
    let currentNode = curr;
    let accumulator = acc;
    while (currentNode) {
      if (currentNode.key) accumulator += 1;
      currentNode = currentNode.next;
    }
    return accumulator;
  }, 0);

  const has = (key) => {
    const currentNode = getNode(key, buckets);
    if (!currentNode) return false;
    return true;
  };

  const set = (key) => {
    const index = hash(key);
    if (index < 0 || index >= buckets.length) throw new Error('Trying to access index out of bound');
    let currentNode = buckets[index];
    if (!currentNode) buckets[index] = node(key);
    else {
      while (currentNode) {
        if (!currentNode.next) {
          currentNode.next = node(key);
          break;
        }
        currentNode = currentNode.next;
      }
    }
    if (calculateLoadFactor(buckets, length) >= LOAD_FACTOR) {
      hadLengths.push(buckets.length * 2);
      new Array(buckets.length).fill(null).forEach((item) => buckets.push(item));
    }
  };

  const remove = (key) => {
    const index = getIndex(key, buckets, hash, hadLengths);
    const previousNode = getPastNode(key, buckets);
    const currentNode = previousNode?.next || getNode(key, buckets);
    if (!currentNode) return false;
    if (!previousNode && currentNode) {
      buckets[index] = null;
      return true;
    }
    if (previousNode && !currentNode.next) {
      previousNode.next = null;
      return true;
    }
    if (previousNode && currentNode.next) {
      previousNode.next = currentNode.next;
      return true;
    }

    return false;
  };

  const clear = () => buckets.filter((item) => item?.key).forEach((item) => {
    const index = getIndex(item.key, buckets, hash, hadLengths);
    buckets[index] = null;
  });

  const keys = () => getAllNodes(buckets).map((item) => item.key);

  return {
    set, has, remove, length, clear, keys,
  };
};

export default HashSet;
