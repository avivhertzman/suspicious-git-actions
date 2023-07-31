import * as express from 'express';
import findSuspicous from '../controller/controller';

const ACCEPTABLE_EVENTS = ['repository', 'team', 'push']

const webhookRouter = express.Router();

webhookRouter.use((req, res, next) => {
    if (ACCEPTABLE_EVENTS.includes(req.get('X-GitHub-Event') as string))
        next();
    else
        res.sendStatus(400);
})

webhookRouter.post('/', findSuspicous)

export default webhookRouter;