import { SuspicouseBehaviorsDetection } from "../abstract/SuspicouseBehaviorsDetection";

export class CodePushServie extends SuspicouseBehaviorsDetection {
    findSuspiciousBehaviors(body): void {
        const suspiciousTime = this.getSuspiciousTime(body);
        if (suspiciousTime != '') {
            const commits = this.getCommitsId(body);
            super.notifyUser(`push event with commit ids: ${commits} pushed to branch ${body['ref']} on `,
                `push event occured between 14:00-16:00 (exact time: ${suspiciousTime}`)
        }
    }

    private getSuspiciousTime(body) {
        const pushedTimeInMs = body?.repository?.pushed_at;
        const fulltimeOfDay: string = new Date(pushedTimeInMs).toISOString().split('T')[1];
        const hour = parseInt(fulltimeOfDay.slice(0, 2));
        const partialtimeOfDay = fulltimeOfDay.slice(0, 8);
        if ((hour < 16 && hour > 14) || (hour == 14 || hour == 16)) {
            return partialtimeOfDay;
        }
        return '';
    }

    private getCommitsId(body) {
        let commits = body?.commits;
        commits = commits.map(commit => commit.id).join(', ');
        return commits;
    }

}