import * as express from 'express';
import {    WebhookController } from '../controller/webhookController';
import { EventTypes } from '../data/enum/eventTypesEnum';
import { StatusCodes } from 'http-status-codes';
import { CodePushService } from '../services/codePushService';
import { TeamCreateService } from '../services/teamCreateService';
import { RepoDeletedService } from '../services/repoDeletedService';

const GitHUB_EVENT_HEADER = 'X-GitHub-Event';

const webhookRouter = express.Router();

const userController = new WebhookController(new CodePushService(), new TeamCreateService, new RepoDeletedService);


webhookRouter.use((req, res, next) => {
    const eventHeader = req.get(GitHUB_EVENT_HEADER);
    if (Object.values(EventTypes).includes(eventHeader as EventTypes)) {
        res.locals.eventHeader = eventHeader;
        next();
    }
    else
        res.sendStatus(StatusCodes.BAD_REQUEST);
})

webhookRouter.post('/', userController.findSuspicous.bind(userController))

export default webhookRouter;