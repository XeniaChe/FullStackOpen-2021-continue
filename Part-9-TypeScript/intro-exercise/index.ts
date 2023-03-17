import express from 'express';
import { calculator, Operation } from './calculator';
import { verifyNum } from './utils';

const app = express();
app.use(express.json());

const PORT = 3003;

app.listen(PORT, () => console.log(`server is runninng on PORT: ${PORT}`));

app.get('/ping', (_req, res) => {
  // _req to tell TS that you know about the issue
  res.send('Pong');
});
app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!verifyNum(+value1) || !verifyNum(+value2))
    res.status(400).json({ data: 'Wrong input' });

  const result = calculator(+value1, +value2, op as Operation); // assert the type of 'op'

  res.send({ result });
});
