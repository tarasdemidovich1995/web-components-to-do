import { v4 as uuidv4 } from 'uuid';

export type NotificationType = 'success' | 'warning' | 'error';

export class Notification {
    public name: string;
    public type: NotificationType;
    public id: string;

    public static success(name: string): Notification {
        const instance: Notification = new Notification();
        instance.id = uuidv4();
        instance.name = name;
        instance.type = 'success';
        return instance;
    }

    public static warning(name: string): Notification {
        const instance: Notification = new Notification();
        instance.id = uuidv4();
        instance.name = name;
        instance.type = 'warning';
        return instance;
    }

    public static error(name: string): Notification {
        const instance: Notification = new Notification();
        instance.id = uuidv4();
        instance.name = name;
        instance.type = 'error';
        return instance;
    }
}