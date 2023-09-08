const getNextIndex = (arr, currentIndex) => {
  const nextIndex = (currentIndex + 1) % arr.length;
  return nextIndex;
};

export default getNextIndex;
