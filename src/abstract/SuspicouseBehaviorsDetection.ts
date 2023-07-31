import { NotifyUserService } from "../services/notifyUser/notifyUserHandler";

export abstract class SuspicouseBehaviorsDetection {
    private notifyUserHandler = new NotifyUserService();
    constructor() {
        
    }
    
    abstract findSuspiciousBehaviors(body): void;
    notifyUser(eventString: string, anomalDetection: string): void {
        this.notifyUserHandler.updateNotifiers(eventString, anomalDetection);
    }
}