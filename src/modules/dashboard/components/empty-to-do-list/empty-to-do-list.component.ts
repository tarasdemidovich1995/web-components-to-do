import { BASE_URL } from './../../../shared/entities/constants';
import { globalEventsService } from './../../../shared/services/global-events/global-events.service';
import { Component } from '../../../../base/component';
import { CustomElement } from '../../../../base/custom-element';
import { Subscription } from '../../../../base/subscription';
import './empty-to-do-list.styles.scss';

export class EmptyToDoListComponent extends CustomElement {
    public init(): void {
        this.template = `
            <div class="empty-to-do-list">
                <div class="empty-to-do-list__empty-img-container">
                    <img src="./assets/images/amico.svg">
                </div>
                <div class="empty-to-do-list__text">
                    There is no to do items in your dashboard yet
                </div>
                <div class="empty-to-do-list__redirect">
                    <button class="empty-to-do-list__redirect-btn">Create To-Do</button>
                </div>
            </div>
        `;
    }

    public initSubscriptions() {
        this.subscriptions.push(
            new Subscription(this.querySelector('.empty-to-do-list__redirect-btn'), 'click', () => {
                globalEventsService.changeRoute(`${BASE_URL}/create`);
            })
        );
    }
}

export const emptyToDoListComponent: Component = new Component('empty-to-do-list', EmptyToDoListComponent);