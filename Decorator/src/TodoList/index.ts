import { todoView } from './template';
import { addTodo, changeCompleted, removeTodo } from './todoEvent';

export interface ITodo {
    id: number;
    content: string;
    completed: boolean;
}

//装饰器实现在DOM操作过程中对数据进行操作
//const todoData: ITodo[] = []; 但这里声明todoData会导致删除操作后的todoData无法更新

class TodoList {

    private oTodoList:HTMLElement;
    private  static instance: TodoList;//静态

    constructor(oTodoList: HTMLElement) {
        this.oTodoList = oTodoList;
    }

    public static create(oTodoList: HTMLElement) {//静态使用
        if(!TodoList.instance) {
            TodoList.instance = new TodoList(oTodoList);
        }

        return TodoList.instance;
    }

    @addTodo//装饰器函数先执行一次(重写可以取到原函数参数)并返过来执行下面的函数 
    public addItem (todo: ITodo) {
        const oItem: HTMLElement = document.createElement('div');
            oItem.className = 'todo-item';
            oItem.innerHTML = todoView(todo);
            this.oTodoList.appendChild(oItem);
    }

    @changeCompleted()
    public toggleCompleted (id: number, completed?: boolean) {//可选参数类型
        const oItems: HTMLCollection = document.getElementsByClassName('todo-item');

            Array.from(oItems).forEach(oItem => {
                //const oCheckbox: HTMLInputElement = oItem.querySelector('input');//类型必须精确才能取到之后的属性
                const _id = parseInt(oItem.querySelector('button').dataset.id);

                if(_id === id) {
                    const oContent: HTMLElement = oItem.querySelector('span');
                    oContent.style.textDecoration = /*oCheckbox.checked*/completed ? 'line-through' : 'none';
                }
            })
    }

    @removeTodo
    public removeItem (id: number) {
        const oItems: HTMLCollection = document.getElementsByClassName('todo-item');

            Array.from(oItems).forEach(oItem => {
                const _id = parseInt(oItem.querySelector('button').dataset.id);

                if(_id === id) {
                    oItem.remove();
                }
            })
    }
}

export default TodoList;