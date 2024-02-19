const HashMap = () => {
  let buckets;

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      if (hashCode > buckets.length) hashCode %= buckets.length;
    }

    return hashCode;
  };

  const set = (key, value) => {
    const index = hashCode(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
  };
};
