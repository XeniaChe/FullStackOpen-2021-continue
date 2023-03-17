import express = require('express');
import { calculateBmi, validateArgs as validateArgsBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { argIsNan } from './utils';

const app = express();
app.use(express.json());

const PORT = 3004;
app.listen(PORT, () => console.log(`server is runninng on PORT: ${PORT}`));

app.get('/bmi', (req, res) => {
  try {
    const { height: q1, mass: q2 } = req.query;

    if (typeof q1 !== 'string' || typeof q2 !== 'string') {
      throw new Error('Query params must be provided');
    } else {
      console.log({ q1 });
      console.log({ q2 });
      const { height, mass } = validateArgsBmi(q1, q2);

      const response = calculateBmi(height, mass);
      res.send(response);
    }
  } catch (error) {
    console.error(error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.send(`Error occured: ${error.message}`);
  }
});

app.post('/exercise', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, dailyExercise } = req.body;

  if (!Array.isArray(dailyExercise) || dailyExercise.some(argIsNan)) {
    res.status(400).send('malformatted parameters');
  }

  if (!target || typeof target !== 'string' || argIsNan(target)) {
    res.status(400).send('malformatted parameters');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(+target, dailyExercise);

  res.send({ data: result });
});
