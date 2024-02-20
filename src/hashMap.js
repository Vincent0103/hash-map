import {
  node, calculateLoadFactor, getIndex, getNode, getPastNode, getAllNodes,
} from './utils.js';

const HashMap = () => {
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

  const get = (key) => {
    const currentNode = getNode(key, buckets);
    if (!currentNode) return null;
    return currentNode.value;
  };

  const has = (key) => {
    const currentNode = getNode(key, buckets);
    if (!currentNode) return false;
    return true;
  };

  const set = (key, value) => {
    const index = hash(key);
    if (index < 0 || index >= buckets.length) throw new Error('Trying to access index out of bound');
    let currentNode = buckets[index];
    if (!currentNode) buckets[index] = node(key, value);
    else {
      while (currentNode) {
        if (currentNode.key === key) {
          currentNode.value = value;
          break;
        }
        if (!currentNode.next) {
          currentNode.next = node(key, value);
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
  const values = () => getAllNodes(buckets).map((item) => item.value);

  return {
    get, set, has, remove, length, clear, keys, values, buckets,
  };
};

const hashMap = HashMap();
hashMap.set('mario', 'is good');
hashMap.set('luigi', 'is also good');
hashMap.set('john', 'is also good');
hashMap.set('jehrek', 'is also good');
hashMap.set('berek', 'is awaiting something');
hashMap.set('samson', 'is awaiting something');
hashMap.set('sami', 'is ok');
hashMap.set('cmtdandebor', 'is feeling thirsty');
hashMap.set('salam', 'can\'t wait no more');
hashMap.set('jeremy', 'Star align is the best game ever done on roblox');
hashMap.set('sarah', 'Star align is the best game ever done on roblox');
hashMap.set('eloise', 'ok bro');
hashMap.set('nathan', 'lipsum orelum');
hashMap.set('layboy', 'such legacy can\'t exist');
hashMap.set('felicity', 'i love drawing');
hashMap.set('solomon', 'everytime someone call me saumon i speak french');
hashMap.set('greek', 'not roman');
hashMap.set('Yousouf', 'AAAARGGGHHH');
hashMap.set('dayumTheGreatest', 'When i smile, it\'s a bad sign 👹');
hashMap.set('carti', 'if i\'m a b* im the baddest b*');
hashMap.set('mightyKingdom', 'i\'m glorious');
hashMap.set('luffy', 'orewa Monkey D. Luffy');
hashMap.set('todoum', 'loudoum');
hashMap.set('sachiburidana', 'mugiwara');
hashMap.set('todou', 'loudou');
hashMap.set('sachiburiana', 'mugiwaa');
hashMap.set('todo', 'loudo');
hashMap.set('sachiburian', 'mugiwa');
hashMap.set('tod', 'loud');
hashMap.set('sachiburia', 'mugiw');
hashMap.set('to', 'lou');
hashMap.set('sachiburi', 'mugi');
hashMap.set('fecity', 'i love dring');
hashMap.set('solom', 'i speak french');

console.log(hashMap.keys());
console.log(hashMap.values());
