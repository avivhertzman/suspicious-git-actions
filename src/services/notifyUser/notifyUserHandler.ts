import { INotifyUser } from "../notifyUserService/INotifyUser";
import { ConsoleNotifyUserService } from "./consoleNotifyUserService";

export class NotifyUserService {
    private notifiers: INotifyUser[] = [];
    constructor() {
        this.notifiers.push(new ConsoleNotifyUserService())
    }
    updateNotifiers(eventString: string, anomalDetection: string) {
        this.notifiers.forEach(notifier => notifier.notify(eventString, anomalDetection))
    }
}