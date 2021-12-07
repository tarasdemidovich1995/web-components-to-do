export class Subscription<T = Event> {
    public host: HTMLElement | Element | Window | Document;
    public type: string;
    public callback: () => void;
    public capture: boolean;

    constructor(host: HTMLElement | Element | Window | Document, type: string, callback: (event?: T) => void, capture: boolean = false) {
        this.host = host;
        this.type = type;
        this.callback = callback;
        this.capture = capture;
    }

    public init(): void {
        this.host.addEventListener(this.type, this.callback, this.capture);
    }

    public remove(): void {
        this.host.removeEventListener(this.type, this.callback);
    }

    public static createAndInit<T = Event>(host: HTMLElement | Window | Document, type: string, callback: (event?: T) => void, capture: boolean = false): Subscription<T> {
        const instance: Subscription<T> = new Subscription<T>(host, type, callback, capture);
        instance.init();
        return instance;
    }
}