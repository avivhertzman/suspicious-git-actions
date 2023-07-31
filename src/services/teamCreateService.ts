import { SuspicouseBehaviorsDetection } from "../abstract/SuspicouseBehaviorsDetection";

const EVENT_INFO_MESSAGE = "create team with team name";
const SUSPICOUSE_BEHAVIORS_MESSAGE = 'name starts with hacker prefix.';

const HACKER_PREFIX = "hacker";

export class TeamCreateService extends SuspicouseBehaviorsDetection {
    constructor() {
        super();
    }
    findSuspiciousBehaviors(body: {name: string}): void {
        const name: string = body?.name;
        if (name.startsWith(HACKER_PREFIX))
            super.notifyUser(`${EVENT_INFO_MESSAGE} ${name},`, SUSPICOUSE_BEHAVIORS_MESSAGE);
    }
}