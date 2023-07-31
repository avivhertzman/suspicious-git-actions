import { SuspicouseBehaviorsDetection } from "../abstract/SuspicouseBehaviorsDetection";
import { namespace } from "d3";

export class RepoDeletedService extends SuspicouseBehaviorsDetection {
    constructor() {
        super();
    }

    findSuspiciousBehaviors(body: any): void {
        const repository = body;
        const createdTime = repository["created_at"];
        const creationTime: number = new Date(createdTime.slice(0, createdTime.length-1)).getTime();
        const date = new Date().getTime();
        if (date - creationTime < (1000 * 60 * 60)) {
            super.notifyUser(`delete repository event with repository name ${repository?.name}`, `the repository was created and deleted within 10 minutes`)
        }
    }

}
function formatDate(inputDateString) {
    const date = new Date(inputDateString);
    const formattedDate = date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
    return formattedDate.replace(',', '');
  }