interface UILike {
    toString(): string;
}

interface AttachUiObject {
    [key: string]: UiObject
}

interface Ui {  
    layout(xml: UILike | any): void;
    inflate(xml: UILike | any, parent?: View): void;
    findView(id: string): View;
    finish(): void;
    setContentView(view: View): void;
    run(callback: Function): void;
    post(callback: Function, delay?: number): void;
    statusBarColor(color: any): void;
    showPopupMenu(view: View, menu: any): void;
    emitter: EventEmitter;
}

declare const ui: Ui & AttachUiObject;