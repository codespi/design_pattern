import { ITodoData } from "../../typings";
import Input, { IInputOptions } from "./Subs/Input";
import List, { IListOptions } from "./Subs/List";

class TodoList {//外观组件

    private el: HTMLElement;//使用前都需要先声明一下
    private todoData: ITodoData[];
    private input: Input;
    private list: List;
    private todoWrapper: HTMLElement;//外观组件容器

    constructor(el: HTMLElement, todoData: ITodoData[]) {
        this.el = el;
        this.todoData = todoData;
        this.todoWrapper = document.createElement('div');
    }
    //定义对外和对内接口
    //对外唯一暴露接口 ----初始化接口 
    public init () {
        this.createComponent();
        this.render();
        this.bindEvent();
    }

    private createComponent () {//内部组件初始化函数
        this.input = new Input(<IInputOptions>{//传入一个参数对象 泛型声明 解耦子组件实例化以后自添加
            wrapperEl: this.todoWrapper,
            placeholderText: '请输入',
            buttonText: '增加'
        });
        this.list = new List(<IListOptions>{
            todoData: this.todoData,
            wrapperEl: this.todoWrapper
        });
    }

    private render () {
        this.input.render();
        this.list.render(); 
        this.el.appendChild(this.todoWrapper);
        
    }

    private bindEvent () {
        this.input.bindEvent();
        this.list.bindEvent();
    }

}
export default TodoList;