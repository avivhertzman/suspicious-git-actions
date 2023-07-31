import { INotifyUser } from "../notifyUserService/INotifyUser";

export class ConsoleNotifyUserService implements INotifyUser {
    notify(eventInfo: string, suspicouseBehaviorInfo: string): void {
        console.log(
            `the suspicios behavior occured on ${eventInfo} because of ${suspicouseBehaviorInfo}`
        );
    }

}