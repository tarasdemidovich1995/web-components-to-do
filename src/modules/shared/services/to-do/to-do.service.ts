import { notificationsService } from './../notifications/notifications.service';
import { Observer } from "../../../../base/observer";
import { ToDo } from "../../entities/to-do";
import { Notification } from '../../entities/notification';

class ToDoService {
    private list: ToDo[] = [];
    public $removeToDo: Observer = new Observer();
    public $updateToDo: Observer = new Observer();
    public $editToDo: Observer = new Observer();

    public createToDo(name: string): void {
        const toDo: ToDo = new ToDo(name);
        this.list.push(toDo);
        notificationsService.showNotification(Notification.success('To do successfully created'));
    }

    public removeToDo(id: string): void {
        this.list = this.list.filter((todo: ToDo) => todo.id !== id);
        this.$removeToDo.broadcast(id);
        notificationsService.showNotification(Notification.success('To do successfully deleted'));
    }

    public updateToDo(id: string, isCompleted: boolean) {
        const toDo: ToDo = this.getToDoById(id);
        toDo.isCompleted = isCompleted;
        this.$updateToDo.broadcast(toDo);
        notificationsService.showNotification(Notification.success('To do successfully updated'));
    }

    public editToDo(id: string, name: string): void {
        const toDo: ToDo = this.getToDoById(id);
        toDo.name = name;
        this.$editToDo.broadcast(id);
        notificationsService.showNotification(Notification.success('To do succesfully edited'));
    }

    public getToDoById(id: string): ToDo {
        return this.list.find((todo: ToDo) => todo.id === id);
    }

    public getList(): ToDo[] {
        return this.list;
    }
}

export const toDoService: ToDoService = new ToDoService();