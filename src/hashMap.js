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

  const get = (key) => buckets[hash(key)]?.value || null;

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

  return {
    node, set, get, buckets, calculateLoadFactor,
  };
};

const hashMap = HashMap();
hashMap.set('mario', 'is good');
hashMap.set('luigi', 'is also good');
hashMap.set('salam', 'is also good');
hashMap.set('john', 'is also good');
hashMap.set('salam', 'is awaiting something');
hashMap.set('sami', 'is ok');
hashMap.set('john', 'is feeling thirsty');
hashMap.set('salam', 'can\'t wait no more');

console.log(hashMap.get('john'));
