import { Component } from '../../../../base/component';
import { CustomElement } from '../../../../base/custom-element';
import { Subscription } from '../../../../base/subscription';
import { Notification } from '../../entities/notification';
import { notificationsService } from '../../services/notifications/notifications.service';
import './notification.styles.scss';

export class NotificationComponent extends CustomElement {
    public progressStatusLine: HTMLElement;
    public isDynamicallyInitiated: boolean = true;
    public state: Notification;
    public expireTime: number;

    public init(): void {
        this.template = `
            <div class="notification">
                <div class="notification__actions">
                    <span class="notification__close material-icons">cancel</span>
                </div>
                <div class="notification__message"></div>
            </div>
        `;
    }

    public initState(): void {
        const host: HTMLElement = this.querySelector('.notification');
        const message: HTMLElement = this.querySelector('.notification__message');
        const closeBtn: HTMLElement = this.querySelector('.notification__close');
        host.classList.add(this.state.type);
        message.innerHTML = this.state.name;
        this.subscriptions.push(
            new Subscription(closeBtn, 'click', () => {
                notificationsService.removeNotification(this.state.id);
            }),
        );
    }

    public initExpiring(): void {
        setTimeout(() => notificationsService.removeNotification(this.state.id), this.expireTime);
    }

    public update(name: string, oldValue: string, newValue: string): void {
        if (newValue) {
            switch(name) {
                case 'state':
                    this.state = JSON.parse(newValue);
                    this.initState();
                    break;
                case 'expire-time':
                    this.expireTime = +newValue;
                    this.initExpiring();
                    break;
                default:
                    console.warn('no such attribute');
                    break;
            }
        }
    }

    static get observedAttributes() {
        return ['state', 'expire-time'];
    }
}
export const notificationComponent: Component = new Component('app-notification', NotificationComponent);