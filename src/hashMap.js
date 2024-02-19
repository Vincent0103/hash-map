const HashMap = () => {
  const buckets = new Array(16);
  const LOAD_FACTOR = 0.75;

  const node = (key, value, next = null) => ({ key, value, next });

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      if (hashCode > buckets.length) hashCode %= buckets.length;
    }

    return hashCode;
  };

  const calculateLoadFactor = () => {
    const itemsAmount = buckets.filter((item) => item.key).reduce((acc, curr) => {
      let currentNode = curr;
      let accumulator = acc;
      while (currentNode) {
        if (currentNode.key) accumulator += 1;
        currentNode = currentNode.next;
      }
      return accumulator;
    }, 0);

    return itemsAmount / buckets.length;
  };

  const getNode = (key, currentNode = buckets[hash(key)]) => {
    if (!currentNode) return null;
    if (key === currentNode.key) return currentNode;
    if (currentNode.next) return getNode(key, currentNode.next);
    return null;
  };

  const get = (key) => {
    const currentNode = getNode(key);
    if (!currentNode) return null;
    return currentNode.value;
  };

  const has = (key) => {
    const currentNode = getNode(key);
    if (!currentNode) return false;
    return true;
  };

  const set = (key, value) => {
    const index = hash(key);
    const currentBucket = buckets[index];
    if (currentBucket && currentBucket.key === key) {
      currentBucket.value = value;
    } else if (currentBucket && currentBucket.key !== key) {
      currentBucket.next = node(key, value);
    } else {
      buckets[index] = node(key, value);
    }
  };

  const remove = (key) => {

  };

  return {
    node, set, get, has, buckets, calculateLoadFactor,
  };
};

const hashMap = HashMap();
hashMap.set('mario', 'is good');
hashMap.set('luigi', 'is also good');
hashMap.set('jehrek', 'is also good');
hashMap.set('john', 'is also good');
hashMap.set('berek', 'is awaiting something');
hashMap.set('samson', 'is awaiting something');
hashMap.set('sami', 'is ok');
hashMap.set('cmtdandebor', 'is feeling thirsty');
hashMap.set('salam', 'can\'t wait no more');
hashMap.set('jeremy', 'Star align is the best game ever done on roblox');

console.log(hashMap.get('jeremy'));
