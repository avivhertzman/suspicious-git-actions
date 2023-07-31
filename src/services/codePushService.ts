import { SuspicouseBehaviorsDetection } from "../abstract/SuspicouseBehaviorsDetection";


const DATE_SPLIT_BY = 'T';
const OFFSET_SPLIT_BY = ' ';
const HOUR_INDEX = 0;
const MAX_SUSPICOUSE_TIME = 16;
const MIN_SUSPICOUSE_TIME = 14; 

export class CodePushService extends SuspicouseBehaviorsDetection {
    
    findSuspiciousBehaviors(body): void {
        const suspiciousTime: string = this.getSuspiciousTime(body);
        if (suspiciousTime.length != 0) {
            const commits: string = this.getCommitsId(body);
            super.notifyUser(`Push event with commit ids: ${commits} pushed to branch ${body?.ref}`,
                `push event occured between 14:00-16:00 (exact time: ${suspiciousTime}).`)
        }
    }

    private getSuspiciousTime(body) {
        const pushedDate = body.head_commit.timestamp;
        const pushedTime: string = pushedDate.split(DATE_SPLIT_BY)[1].split(OFFSET_SPLIT_BY)[HOUR_INDEX];
        const hour = this.getPushedTimeHour(pushedTime);
        if (this.isHourBetweenSuspicouseHours(hour)) {
            return pushedTime;
        }
        return '';
    }

    getPushedTimeHour(fulltimeOfDay: string) {
        return parseInt(fulltimeOfDay.slice(0, 2));
    }
    
    isHourBetweenSuspicouseHours(hour: number): boolean {
         return (hour < MAX_SUSPICOUSE_TIME && hour > MIN_SUSPICOUSE_TIME) || (hour == MIN_SUSPICOUSE_TIME || hour == MAX_SUSPICOUSE_TIME)
    }

    private getCommitsId(body): string {
        const commits: {id: string}[] = body?.commits;
        const commitsAsString: string = commits.map(commit => commit?.id).join(', ');
        return commitsAsString;
    }

}