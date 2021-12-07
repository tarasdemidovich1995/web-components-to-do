import { globalEventsService } from './../../../shared/services/global-events/global-events.service';
import { Watcher } from './../../../../base/watcher';
import { BASE_URL } from './../../../shared/entities/constants';
import { ToDo } from './../../../shared/entities/to-do';
import { notificationsService } from './../../../shared/services/notifications/notifications.service';
import { Component } from '../../../../base/component';
import { CustomElement } from '../../../../base/custom-element';
import { Subscription } from '../../../../base/subscription';
import { toDoService } from '../../../shared/services/to-do/to-do.service';
import { Notification } from '../../../shared/entities/notification';
import './update-to-do.styles.scss';


export class UpdateToDoComponent extends CustomElement {
    public nameHost: HTMLInputElement;
    public todo: ToDo;

    public get id(): string {
        return window.location.hash.replace(`${BASE_URL}/edit/`, '');
    }

    public init(): void {
        this.template = `
            <form class="update-to-do">
                <div class="update-to-do__field">
                    <input class="update-to-do__input" type="text" placeholder="Please write new to-do">
                </div>
                <div class="update-to-do__actions">
                    <button class="update-to-do__add-btn" type="submit">Edit to-do</button> 
                </div>
            </div>
        `;
    }

    public initHosts(): void {
        this.nameHost = this.querySelector('.update-to-do__input');
    }

    public initExistedToDo(): void {
        this.todo = toDoService.getToDoById(this.id);
        if (!this.todo) {
            globalEventsService.changeRoute(`${BASE_URL}/dashboard`);
        } else {
            this.nameHost.value = this.todo.name;
        }
    }

    public initSubscriptions(): void {
        this.subscriptions.push(
            new Subscription(this.querySelector('.update-to-do'), 'submit', (event: SubmitEvent) => {
                event.preventDefault();
                if (this.nameHost.value && this.todo.name !== this.nameHost.value) {
                    toDoService.editToDo(this.todo.id, this.nameHost.value);
                    this.nameHost.value = '';
                } else {
                    notificationsService.showNotification(Notification.error('To do should have name'));
                }
            }),
            new Watcher(toDoService.$editToDo, () => {
                globalEventsService.changeRoute(`${BASE_URL}/dashboard`);
            })
        );
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this.initExistedToDo();
    }
}

export const updateToDoComponent: Component = new Component('update-to-do', UpdateToDoComponent);