import { INotifyUser } from "../notifyUserService/INotifyUser";

export class ConsoleNotifyUserService implements INotifyUser {
    notify(eventString: string, anomalDetection: string): void {
        console.log(
            `the suspicios behaviore occured on event ${eventString} because of : ${anomalDetection}`
        );
    }

}