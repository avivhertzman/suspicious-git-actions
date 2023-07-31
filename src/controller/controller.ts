import { EventTypes } from "../data/enum/eventTypesEnum"
import { CodePushServie } from "../services/codePushService";
import { TeamCreateService } from "../services/teamCreateService";
import { RepoDeletedService } from "../services/repoDeletedService";

const codePushService = new CodePushServie();
const repoDeletedService = new RepoDeletedService();
const teamCreateService = new TeamCreateService();

function findSuspicous(req, res) {
    const body = req.body;
    const eventHeader = req.get('X-GitHub-Event');
    switch (getWebHookType(body, eventHeader)) {
        case EventTypes.REPO_CREATE:
            repoDeletedService.findSuspiciousBehaviors(body?.repository);
            res.sendStatus(200);
            break;
        case EventTypes.CODE_PUSH:
            codePushService.findSuspiciousBehaviors(body);
            res.sendStatus(200);
            break;
        case EventTypes.TEAM_CREATE:
            teamCreateService.findSuspiciousBehaviors(body?.team);
            res.sendStatus(200);
            break;
        default:
            res.sendStatus(400);
    }


    function getWebHookType(body, eventHeader) {
        if (eventHeader === 'repository' && body.action == 'deleted' && body.repository && body.sender)
            return EventTypes.REPO_CREATE;
        if (eventHeader === 'team' && body.action == 'created' && body.organization && body.team)
            return EventTypes.TEAM_CREATE;
        if (eventHeader == 'push')
            return EventTypes.CODE_PUSH;


    }
}

export default findSuspicous;