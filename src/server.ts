// import express from 'express';
import 'reflect-metadata';

import webhookRouter from './router/webhookRouter';



// const app = express()

// app.use(express.json())inge

// app.up(webhookRouter);

// app.listen(8080, () => {
//     console.log("app is up");
// })


import * as express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(webhookRouter);

app.listen(8000, () => {
    console.log('hiiii');
})