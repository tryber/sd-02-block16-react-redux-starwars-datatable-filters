const sleep = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  while (currentDate - date < milliseconds) {
    currentDate = Date.now();
  }
};
export default sleep;
