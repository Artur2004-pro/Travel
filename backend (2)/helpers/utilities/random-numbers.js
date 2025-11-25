function randomNumbers(length) {
  length = length ? length : 4;
  let res = "";
  for (let i = 0; i < length; ++i) {
    const num = Math.floor(Math.random() * 10);
    res += num;
  }
  return res;
}

module.exports = randomNumbers;
