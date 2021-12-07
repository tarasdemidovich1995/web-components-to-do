import { NotificationComponent, notificationComponent } from '../../components/notification/notification.component';
import { Observer } from "../../../../base/observer";
import { Notification } from "../../entities/notification";
import { NOTIFY_EXPIRE_TIME } from '../../entities/constants';

class NotificationsService {
    public notificationsContainerHost: HTMLElement;
    public notifications: NotificationComponent[] = [];

    public showNotification(notification: Notification): void {
        if (!this.notifications.length) {
            this.createNotificationsHost();
        }
        const notificationComponent: HTMLElement = new NotificationComponent();
        notificationComponent.setAttribute('state', JSON.stringify(notification));
        notificationComponent.setAttribute('expire-time', `${NOTIFY_EXPIRE_TIME}`);
        this.notificationsContainerHost.appendChild(notificationComponent);
        this.notifications.push(notificationComponent as NotificationComponent);
    }

    public removeNotification(id: string): void {
        const index: number = this.notifications.findIndex((entity: NotificationComponent) => entity.state.id === id);
        this.notifications[index].remove();
        this.notifications = [...this.notifications.slice(0, index), ...this.notifications.slice(index + 1)];
        if (!this.notifications.length) {
            this.notificationsContainerHost.remove();
        }
    }

    public createNotificationsHost(): void {
        this.notificationsContainerHost = document.createElement('div');
        this.notificationsContainerHost.classList.add('notifications-host');
        document.body.appendChild(this.notificationsContainerHost);
    }
}

export const notificationsService: NotificationsService = new NotificationsService();