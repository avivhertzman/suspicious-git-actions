import { SuspicouseBehaviorsDetection } from "../abstract/SuspicouseBehaviorsDetection";

const MILLISECONDS_UNIT = 1000;
const HOURS_UNIT = 60;
const MINUTES_UNIT = 60;
const TEN_MINUTES_IN_MILLISECONDS = MILLISECONDS_UNIT * HOURS_UNIT * MINUTES_UNIT;
const EVENT_INFO_MESSAGE = "Delete repository event with repository name ";
const SUSPICOUSE_BEHAVIORS_MESSAGE = "the repository was deleted in less than 10 minutes after it was created";

export class RepoDeletedService extends SuspicouseBehaviorsDetection {
    constructor() {
        super();
    }

    findSuspiciousBehaviors(body: {created_at: string, name: string}): void {
        const createdTime = body?.created_at;
        const creationTime: number = new Date(createdTime.slice(0, createdTime.length-1)).getTime();
        const deleteDate: number = new Date().getTime();
        const timeDiffrence = deleteDate - creationTime;
        if (timeDiffrence < TEN_MINUTES_IN_MILLISECONDS || timeDiffrence == TEN_MINUTES_IN_MILLISECONDS) {
            super.notifyUser(EVENT_INFO_MESSAGE + body?.name, SUSPICOUSE_BEHAVIORS_MESSAGE)
        }
    }
  }