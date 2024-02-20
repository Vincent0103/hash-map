const HashMap = () => {
  const buckets = new Array(16).fill(null);
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

  const length = () => buckets.filter((item) => item?.key).reduce((acc, curr) => {
    let currentNode = curr;
    let accumulator = acc;
    while (currentNode) {
      if (currentNode.key) accumulator += 1;
      currentNode = currentNode.next;
    }
    return accumulator;
  }, 0);

  const calculateLoadFactor = () => length() / buckets.length;

  const getNode = (key) => buckets.find((item) => {
    let currentItem = item;
    while (currentItem) {
      if (key === currentItem.key) return true;
      currentItem = currentItem.next;
    }
    return false;
  }) || null;

  const getPastNode = (key) => buckets.find((item) => {
    let currentItem = item;
    while (currentItem && currentItem.next) {
      if (currentItem.next && key === currentItem.next.key) return true;
      currentItem = currentItem.next;
    }
    return false;
  }) || null;

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
    if (calculateLoadFactor() >= LOAD_FACTOR) {
      new Array(buckets.length).fill(null).forEach((item) => buckets.push(item));
    }
  };

  const remove = (key) => {
    const index = hash(key);
    if (index < 0 || index >= buckets.length) throw new Error('Trying to access index out of bound');
    let previousNode = null;
    let currentNode = buckets[index];
    if (!currentNode) return false;
    if (currentNode.key === key) {
      if (!currentNode.next) {
        buckets[index] = null;
        return true;
      }
      if (currentNode.next) {
        buckets[index] = currentNode.next;
        return true;
      }
    }

    while (currentNode.next) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      if (currentNode.key === key) {
        if (!currentNode.next) {
          previousNode.next = null;
          return true;
        } if (currentNode.next) {
          previousNode.next = currentNode.next;
          return true;
        }
      }
    }

    return false;
  };

  const clear = () => buckets.filter((item) => item?.key).forEach((item) => remove(item.key));

  return {
    get, set, has, remove, length, buckets, clear,
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

// hashMap.clear();
console.log(hashMap.buckets);
