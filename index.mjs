import express from 'express';
import cors from 'cors';
import apiRouter from './routes/apiRouter.mjs';

const app = express();

//Register view engine
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());

app.use('/api/todos', apiRouter);

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
