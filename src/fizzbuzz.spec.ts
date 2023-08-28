describe('FizzBuzz', () => {
  it('Should return "Fizz" when divisible by 3', () => {
    expect(fizzBuzz(3)).toBe('Fizz');
  });

  it('Should return "Buzz" when divisible by 5', () => {
    expect(fizzBuzz(5)).toBe('Buzz');
  });

  it('Should return "FizzBuzz" when divisible by 3 and 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });

  it('Should return the number when not divisible by 3 or 5', () => {
    expect(fizzBuzz(1)).toBe('1');
    expect(fizzBuzz(2)).toBe('2');
    expect(fizzBuzz(4)).toBe('4');
  });
});

function fizzBuzz(n: number) {
  if (isDivisibleBy(n, 3) && isDivisibleBy(n, 5)) return 'FizzBuzz';
  if (isDivisibleBy(n, 3)) return 'Fizz';
  if (isDivisibleBy(n, 5)) return 'Buzz';

  return n.toString();
}

function isDivisibleBy(dividend: number, divisor: number): boolean {
  return dividend % divisor === 0;
}
