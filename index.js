import express from 'express';
import { router as routerIndex } from './routes/index.js';
import { router as routerUser } from './routes/user.js';
import { router as routerApiBook } from './routes/api/book.js';
import { router as routerBook } from './routes/book.js';
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
// app.use(express.json());
app.use('/', routerIndex);
app.use('/api/user/login', routerUser);
app.use('/api/books', routerApiBook);
app.use('/books', routerBook);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})