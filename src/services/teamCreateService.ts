import { SuspicouseBehaviorsDetection } from "../abstract/SuspicouseBehaviorsDetection";

export class TeamCreateService extends SuspicouseBehaviorsDetection {
    constructor() {
        super();
    }
    findSuspiciousBehaviors(body: any): void {
        const name: string = body?.name;
        if (name.startsWith("hacker"))
            super.notifyUser(`create team with team name ${name}, `, 'name starts with hacker prefix hacker.');
    }
}