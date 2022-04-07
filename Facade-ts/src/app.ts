import TodoList from './components/TodoList';
import { ITodoData } from './typings';

;((doc) => {

    const oApp: HTMLElement = doc.querySelector('#app');

    const todoData: ITodoData[] = []//出现对象就需要定义接口 声明一下类型

    const init = (): void => {
        const todoList: TodoList = new TodoList(oApp, todoData);
        todoList.init();//组件初始化入口
    }

    init();

})(document)