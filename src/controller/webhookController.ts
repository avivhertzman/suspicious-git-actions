import { EventTypes } from "../data/enum/eventTypesEnum"
import { StatusCodes } from 'http-status-codes';
import { SuspicouseBehaviorsDetection } from "../abstract/SuspicouseBehaviorsDetection";

const REPO_DELETE_ACTION = "deleted";
const TEAM_CREATE_ACTION = "created";

export class WebhookController {
    constructor(
        private codePushService: SuspicouseBehaviorsDetection,
        private teamCreateService: SuspicouseBehaviorsDetection,
        private repoDeletedService: SuspicouseBehaviorsDetection,
    ) { }
    findSuspicous(req, res) {
        const body = this.getParsedBody(req.body.payload);
        const eventHeader = res.locals.eventHeader;
        switch (this.getWebHookType(body, eventHeader)) {
            case EventTypes.REPO_DELETE:
                this.repoDeletedService.findSuspiciousBehaviors(body?.repository);
                break;
            case EventTypes.CODE_PUSH:
                this.codePushService.findSuspiciousBehaviors(body);
                break;
            case EventTypes.TEAM_CREATE:
                this.teamCreateService.findSuspiciousBehaviors(body?.team);
                break;
            default:
                res.sendStatus(StatusCodes.BAD_REQUEST);
                return;
        }
        res.sendStatus(StatusCodes.OK)
    }

    private getParsedBody(payload) {
        return JSON.parse(decodeURIComponent((payload + '').replace(/\+/g, ' ')))
    }

    private getWebHookType(body, eventHeader) {
        if (eventHeader === EventTypes.REPO_DELETE && body.action == REPO_DELETE_ACTION && body.repository && body.sender)
            return EventTypes.REPO_DELETE;
        if (eventHeader === EventTypes.TEAM_CREATE && body.action == TEAM_CREATE_ACTION && body.organization && body.team)
            return EventTypes.TEAM_CREATE;
        if (eventHeader == EventTypes.CODE_PUSH)
            return EventTypes.CODE_PUSH;
    }

}