import { Module } from '../../base/module';
import { toDoComponent } from './components/to-do/to-do.component';
import { toDoListComponent } from './components/to-do-list/to-do-list.component';
import { emptyToDoListComponent } from './components/empty-to-do-list/empty-to-do-list.component';

export const dashboardModule: Module = new Module([
    emptyToDoListComponent,
    toDoListComponent,
    toDoComponent
]);
