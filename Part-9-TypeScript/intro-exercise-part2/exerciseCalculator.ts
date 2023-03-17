import { argIsNan } from './utils';
interface resObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  target: number,
  dailyHours: number[]
): resObject => {
  let i = 0,
    totalHours = 0;

  const res = {
    periodLength: 7,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: '',
    target: target,
    average: 0,
  };

  while (i < dailyHours.length) {
    if (dailyHours[i] > 0) {
      totalHours += dailyHours[i];
      res.trainingDays++;
    }

    i++;
  }

  res.average = totalHours / res.periodLength;

  if (res.average < target) {
    res.rating = 0;
    res.ratingDescription = 'not too bad but could be better';
  } else {
    res.rating = 1;
    res.success = true;
    res.ratingDescription = 'GOOD. you trained enought';
  }

  return res;
};

const validateArgs = (
  args: string[]
): { target: number; dailies: number[] } => {
  const arr = args.slice(2);
  const [target, ...restArgs] = arr;

  const dailyCheck = restArgs.some(argIsNan);

  if (argIsNan(target) || dailyCheck) {
    throw new Error('Wrong arguments');
  }

  const dailies = restArgs.map((el) => +el);
  if (dailies.length < 7) throw new Error('Not enought arguments');

  return { target: +target, dailies };
};

// const { target, dailies } = validateArgs(process.argv);
// console.log(calculateExercises(target, dailies));

export { calculateExercises, validateArgs };
