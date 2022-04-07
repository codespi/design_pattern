import TodoDom from "./TodoDom";
import TodoEvent from "./TodoEvent";

export interface ITodo {
    id: number;
    content: string;
    completed: boolean;
} 

enum EVENT_TYPE {
    ADD = 'add',
    REMOVE = 'remove',
    TOGGLE = 'toggle'
}

class TodoList {

    private static instance: TodoList;
    private oTodoList: HTMLElement;//容器
    private todoEvent: TodoEvent;
    private todoDom: TodoDom;
    //事件容器(一系列方法)归类
    private addHandlers: any[] = [];
    private removeHandlers: any[] = [];
    private toggleHandlers: any[] = [];

    constructor(oTodoList: HTMLElement) {
        this.oTodoList = oTodoList;

        this.initTodo();
    }

    public static create (oTodolist: HTMLElement) {
        if(!TodoList.instance) {
            TodoList.instance = new TodoList(oTodolist);
        }

        return TodoList.instance;
    }

    private initTodo () {
        this.todoEvent = TodoEvent.create();
        this.todoDom = TodoDom.create(this.oTodoList);

        for(let k in EVENT_TYPE) {//循环执行存入相应容器
            this.initHandlers(EVENT_TYPE[k]);
        }
    }

    private initHandlers (type: EVENT_TYPE) {
        switch(type) {
            case EVENT_TYPE.ADD:
                this.addHandlers.push(this.todoEvent.addTodo.bind(this.todoEvent));//防止方法调用带来的隐式this指向改变故需要手动bind使内部this保持稳定
                this.addHandlers.push(this.todoDom.addItem.bind(this.todoDom));
                break;
            case EVENT_TYPE.REMOVE:
                this.removeHandlers.push(this.todoEvent.removeTodo.bind(this.todoEvent));
                this.removeHandlers.push(this.todoDom.removeItem.bind(this.todoDom));
                break;
            case EVENT_TYPE.TOGGLE:
                this.toggleHandlers.push(this.todoEvent.toggleTodo.bind(this.todoEvent));
                this.toggleHandlers.push(this.todoDom.toggleItem.bind(this.todoDom));
                break;
            default:
                break;
        }
    }

    //统一整合到一个通知函数中
    public notify<T> (type: string, param: T) {//泛型达到使用时动态传参的目的
        let i: number = 0;
        let handlers: any [];
        let res: any;

        switch (type) {
            case EVENT_TYPE.ADD:
                handlers = this.addHandlers;
                break;
            case EVENT_TYPE.REMOVE:
                handlers = this.removeHandlers;
                break;
            case EVENT_TYPE.TOGGLE:
                handlers = this.toggleHandlers;
                break;
            default:
                break;
        }

        //第一项Promise 首先要执行一次
        res = handlers[i](param);

        while(i < handlers.length - 1) {
            i ++;
            res = res.then((param) => {
                return handlers[i](param);//继续返回一个Promise的实例来继续循环
            });
        }
    }
}

export default TodoList;