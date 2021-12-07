import { Module } from '../../base/module';
import { updateToDoComponent } from './components/udpate-to-do/update-to-do.component';
import { createToDoComponent } from './components/create-to-do/create-to-do.component';

export const createModule: Module = new Module([
    createToDoComponent,
    updateToDoComponent
]);
