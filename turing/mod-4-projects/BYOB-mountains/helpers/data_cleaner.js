
const keysToLowerCase = (array) => {
	return array.map(obj => {
    Object.keys(obj).forEach(key => {
      const k = key.toLowerCase();
      if (k !== key) {
        obj[k] = obj[key];
        delete obj[key];
      }
    });
    return obj;
  })
}

const sortByRange = (array) => {
  return array.sort((a, b) =>{
      if (a.range.toUpperCase() < b.range.toUpperCase()) {
        return -1;
      }
      if (a.range.toUpperCase() > b.range.toUpperCase()) {
        return 1;
      }
  })
}

const cleanArray = (array) => {
  const lowerCaseMountains = keysToLowerCase(array)
  const sortedArray = sortByRange(lowerCaseMountains)
  return sortedArray
}

module.exports = cleanArray;
