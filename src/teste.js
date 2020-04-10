function solution(number) {
  let numberValue = number;
  const allNumbers = [];
  while (numberValue > 0) {
    if (number % 3 === 0 && number % 5 === 0) {
      allNumbers.push(number);
      numberValue -= 1;
    }
  }
  return allNumbers.reduce((acc, actual) => acc + actual);
}

console.log(solution(45));
