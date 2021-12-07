import { v4 as uuidv4 } from 'uuid';

export class ToDo {
    public id: string;
    public name: string;
    public isCompleted: boolean;

    constructor(name: string) {
        this.id = uuidv4();
        this.name = name;
        this.isCompleted = false;
    }
}