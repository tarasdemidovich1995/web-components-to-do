import { notificationsService } from './../../../shared/services/notifications/notifications.service';
import { Component } from '../../../../base/component';
import { CustomElement } from '../../../../base/custom-element';
import { Subscription } from '../../../../base/subscription';
import { toDoService } from '../../../shared/services/to-do/to-do.service';
import './create-to-do.styles.scss';
import { Notification } from '../../../shared/entities/notification';


export class CreateToDoComponent extends CustomElement {
    public nameHost: HTMLInputElement;

    public init(): void {
        this.template = `
            <form class="create-to-do">
                <div class="create-to-do__field">
                    <input class="create-to-do__input" type="text" placeholder="Please write new to-do">
                </div>
                <div class="create-to-do__actions">
                    <button class="create-to-do__add-btn" type="submit">Add to-do</button> 
                </div>
            </div>
        `;
    }

    public initHosts(): void {
        this.nameHost = this.querySelector('.create-to-do__input');
    }

    public initSubscriptions(): void {
        this.subscriptions.push(
            new Subscription(this.querySelector('.create-to-do'), 'submit', (event: SubmitEvent) => {
                event.preventDefault();
                if (this.nameHost.value) {
                    toDoService.createToDo(this.nameHost.value);
                    this.nameHost.value = '';
                } else {
                    notificationsService.showNotification(Notification.error('To do should have name'));
                }
            })
        );
    }
}

export const createToDoComponent: Component = new Component('create-to-do', CreateToDoComponent);