export const shuffle = (array) => {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * array.length);
    currentIndex--;

    let temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
};

export const getIndexesOfDifference = (arr1, arr2) => {
  const indexes = [];

  arr1.forEach((item1, index1) => {
    const index2 = arr2.findIndex((item2) => item2.id === item1._id);
    if (index2 === -1) {
      indexes.push(index1 + 1);
    }
  });

  return indexes;
};
