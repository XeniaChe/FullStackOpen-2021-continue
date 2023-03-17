const multiply = (a: number, b: number, textToPrint: string) => {
  console.log(a * b, textToPrint);
};

/* 
  const a: number = +process.argv[2]; // those will be the args you pass when running a script
  const b: number = +process.argv[3]; // e.g. npm run multiply 2 3 
  multiply(a, b, `Multiplied ${a} and ${b}, the result is:`);
*/
console.log(process.argv);

interface MultiplyValues {
  value1: number;
  value2: number;
}

// This all is to prevent one of the argument be NAN
const convertMultiplyValues = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('not enought arguments');
  if (args.length > 4) throw new Error('too many arguments');

  const v1 = !isNaN(+args[2]);
  const v2 = !isNaN(+args[3]);

  if (v1 && v2) {
    return { value1: +args[2], value2: +args[3] };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { value1, value2 } = convertMultiplyValues(process.argv);
  const res = multiply(value1, value2, 'test');
  console.log(`Multiplied ${value1} and ${value2}, the result is:${res}`);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';

  if (error instanceof Error) errorMessage += error.message;
  console.log(errorMessage);
}
