import { argIsNan } from './utils';

const calculateBmi = (height: number, mass: number): string => {
  const heightM = height * 0.01;
  const res = mass / heightM ** 2;

  if (res < 16) return 'Underweight (Severe thinness)';
  if (res > 16 && res < 16.9) return 'Underweight (Severe thinness)';
  if (res > 17 && res < 18.4) return 'Underweight (Mild thinness)';
  if (res > 18.5 && res < 24.9) return 'Normal range';
  if (res > 25.0 && res < 29.9) return 'Overweight (Pre-obese)';
  if (res > 30.0 && res < 34.9) return 'Obese (Class I)';
  if (res > 35.0 && res < 39.9) return 'Obese (Class II)';

  return 'Obese (Class III)';
};
console.log('PATH: ' + process.argv[0]); // PATH

const validateArgs = (
  val1: string,
  val2: string
): { height: number; mass: number } => {
  if (argIsNan(val1) || argIsNan(val2)) {
    throw new Error('Wrong arguments');
  }

  return { height: +val1, mass: +val2 };
};

// const { height: h, mass: m } = validateArgs(process.argv[2], process.argv[3]);
// console.log(calculateBmi(h, m));

export { calculateBmi, validateArgs };
