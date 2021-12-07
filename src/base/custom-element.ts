import { Watcher } from './watcher';
import { Subscription } from './subscription';
import { isSubscription, isWatcher } from './type-predections';

export abstract class CustomElement extends HTMLElement {
    public template: string;
    public props: any;
    public subscriptions: (Subscription | Watcher)[] = [];
    public isInitialized: boolean = false;
    public isDynamicallyInitiated: boolean = false;

    constructor() {
        super();
        this.init();
        this.render();
    }

    abstract init(): void;

    public update(name: string, oldValue: string, newValue: string): void {}
    public initHosts(): void {}
    public initSubscriptions(): void {}

    public render() {
        if (!this.template) {
            throw new Error(`template should be provided for ${this.nodeName}`);
        }
        this.innerHTML = this.template;
    }


    public connectedCallback(): void {
        this.initHosts();
        this.initSubscriptions();
        this.isInitialized = true;
        this.subscriptions.forEach((entity: Subscription | Watcher) => {
            if (isSubscription(entity)) {
                entity.init();
            } else if (isWatcher(entity)) {
                entity.subscribe();
            }
        });
    }
    
    public disconnectedCallback(): void {
        this.subscriptions.forEach((entity: Subscription | Watcher) => {
            if (isSubscription(entity)) {
                entity.remove();
            } else if (isWatcher(entity)) {
                entity.unsubscribe();
            }
        });
    }
    
    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (this.isInitialized || this.isDynamicallyInitiated) {
            this.update(name, oldValue, newValue);
        }
    }

}