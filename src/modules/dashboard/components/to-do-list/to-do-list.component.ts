import { Watcher } from './../../../../base/watcher';
import { ToDo } from './../../../shared/entities/to-do';
import { Component } from '../../../../base/component';
import { CustomElement } from '../../../../base/custom-element';
import { toDoService } from '../../../shared/services/to-do/to-do.service';
import './to-do-list.styles.scss';
import { ToDoComponent } from '../to-do/to-do.component';

export class ToDoListComponent extends CustomElement {
    public contentHost: HTMLElement;
    public listingTpl: HTMLTemplateElement;
    public emptyListingTpl: HTMLTemplateElement;
    public todos: ToDoComponent[] = [];

    public init(): void {
        this.template = `
            <div class="to-do-list"></div>
            <template id="empty-to-do-list">
                <empty-to-do-list></empty-to-do-list>
            </template>
            <template id="to-do-list">
                <div class="to-do-list__content">
                    ${toDoService.getList().map((todo: ToDo) => `<to-do name='${todo.name}' id='${todo.id}' is-completed='${todo.isCompleted}'></to-do>`).join('')}
                </div>
            </template>
        `;
    }

    public initHosts(): void {
        this.contentHost = this.querySelector('.to-do-list');
        this.listingTpl = this.querySelector('#to-do-list');
        this.emptyListingTpl = this.querySelector('#empty-to-do-list');
    }

    public renderContent(): void {
        this.contentHost.innerHTML = '';
        this.contentHost.appendChild(toDoService.getList().length 
            ? this.listingTpl.content.cloneNode(true)
            : this.emptyListingTpl.content.cloneNode(true)
        );
        this.todos = Array.from(this.querySelectorAll('to-do'));
    }

    public initSubscriptions(): void {
        this.subscriptions.push(
            new Watcher(toDoService.$removeToDo, (id: string) => {
                if (!toDoService.getList().length) {
                    this.todos = [];
                    this.renderContent();
                }
                this.todos.forEach((todo: ToDoComponent) => {
                    if (todo.props.id === id) {
                        todo.remove();
                    }
                });
            }),
            new Watcher(toDoService.$updateToDo, (changedTodo: ToDo) => {
                const todo: ToDoComponent = this.todos.find((entity: ToDoComponent) => entity.props.id === changedTodo.id);
                todo.setAttribute('is-completed', `${changedTodo.isCompleted}`);
            })
        )
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this.renderContent();
    }
}

export const toDoListComponent: Component = new Component('to-do-list', ToDoListComponent);