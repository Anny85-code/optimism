const comma = (num) => {
  if (typeof num === 'number' || typeof +num === 'number') {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return num;
};

export default comma;
