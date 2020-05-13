const debounceTime = (milliseconds, fn) => {
  let timer = 0;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, milliseconds);
  };
};

export default debounceTime;
