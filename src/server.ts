import webhookRouter from './router/webhookRouter';

import * as express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(webhookRouter);

app.listen(8000, () => {
    console.log('app init');
})