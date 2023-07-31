// import express from 'express';
import webhookRouter from './router/webhookRouter';


// const app = express()

// app.use(express.json())
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next()
// })

// app.up(webhookRouter);

// app.listen(8080, () => {
//     console.log("app is up");
// })

import * as express from 'express';
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(webhookRouter);

app.listen(8000, () => {
    console.log('hiiii');
})