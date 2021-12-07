import { BASE_URL } from './../../../shared/entities/constants';
import { globalEventsService } from './../../../shared/services/global-events/global-events.service';
import { Component } from '../../../../base/component';
import { CustomElement } from '../../../../base/custom-element';
import { toDoService } from '../../../shared/services/to-do/to-do.service';
import { Subscription } from '../../../../base/subscription';
import './to-do.styles.scss';

export interface ToDoComponentProps {
    id: string;
    name: string;
    isCompleted: boolean;
}

export class ToDoComponent extends CustomElement {
    public nameHost: HTMLElement;

    public init(): void {
        this.props = <ToDoComponentProps>{ 
            id: this.getAttribute('id'),
            name: this.getAttribute('name'),
            isCompleted: this.getAttribute('is-completed') === 'true',
        };
        this.template = `
            <div class="to-do">
                <div class="to-do__name">${this.props.name}</div>
                <div class="to-do__actions">
                    <span class="to-do__icon to-do__icon_toggle-status material-icons">published_with_changes</span>
                    <span class="to-do__icon to-do__icon_edit material-icons">edit</span>
                    <span class="to-do__icon to-do__icon_delete material-icons">delete</span>
                </div>
            </div>
        `;
    }

    public initHosts(): void {
        this.nameHost = this.querySelector('.to-do__name');
    }

    public initSubscriptions(): void {
        this.subscriptions.push(
            new Subscription(this.querySelector('.to-do__actions'), 'click', (event: MouseEvent) => {
                const target: HTMLElement = event.target as HTMLElement;
                event.stopPropagation();
                if (target.classList.contains('to-do__icon')) {
                    switch (true) {
                        case target.classList.contains('to-do__icon_toggle-status'):
                            toDoService.updateToDo(this.props.id, !this.props.isCompleted);
                            break;
                        case target.classList.contains('to-do__icon_edit'):
                            globalEventsService.changeRoute(`${BASE_URL}/edit/${this.props.id}`);
                            break;
                        case target.classList.contains('to-do__icon_delete'):
                            toDoService.removeToDo(this.props.id);
                            break;
                        default:
                            console.warn('there is no such action');
                            break;
                    }
                }
            })
        )
    }

    public update(name: string, oldValue: string, newValue: string) {
        if (newValue) {
            switch(name) {
                case 'is-completed':
                    this.updateStatus(newValue === 'true');
                    break;
                default:
                    console.warn('there are no handlers for such attribute');
                    break;
            }
        }
    }


    public updateStatus(isCompleted: boolean): void {
        this.props.isCompleted = isCompleted;
        if (isCompleted) {
            this.nameHost.classList.add('to-do__name_completed');
        } else {
            this.nameHost.classList.remove('to-do__name_completed');
        }
    }

    static get observedAttributes() {
        return ['is-completed'];
    }
}

export const toDoComponent: Component = new Component('to-do', ToDoComponent);