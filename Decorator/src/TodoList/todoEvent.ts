import { ITodo } from ".";

let todoData: ITodo[] = [];

export function addTodo (
        target: any,//当前装饰函数的容器(原型)-----》TodoList.prototype
        methodName: string, //被装饰的函数名称  看装饰器挂载位置
        descriptor: PropertyDescriptor//描述我们的属性
    ) {
        const _origin = descriptor.value;//即保存原有的函数本身  从描述器里面进行获取     严格模式下
        //获取到原函数以及参数开始 重写("拦截")   实质是扩展原型 这里是TodoList.protoytype
        descriptor.value = function (todo: ITodo) {//描述器里面this指向还是指向TodoList实例的
            const _todo: ITodo | null = todoData.find((t: ITodo) => t.content === todo.content);

            if(_todo) {
                alert('该项已经存在');
                return;
            }

            todoData.push(todo);
            _origin.call(this, todo);//返回并执行原来的函数addItem
        }
    }


export function removeTodo(
        target: any,
        methodName: string, //被装饰的函数名称
        descriptor: PropertyDescriptor//描述我们的属性
    ) {
        const _origin = descriptor.value;

        descriptor.value = function (id: number) {
            todoData = todoData.filter((todo: ITodo) => todo.id !== id);

            _origin.call(this, id);
        }
    }

export function changeCompleted() {
    return function (
        target: any,
        methodName: string, //被装饰的函数名称
        descriptor: PropertyDescriptor//描述我们的属性
    ) {
        const _origin = descriptor.value;

        descriptor.value = function (id: number) {
            todoData = todoData.map((todo: ITodo) => {
                if(todo.id === id) {
                    todo.completed = !todo.completed;
                    _origin.call(this, id, todo.completed);
                }
                return todo;//map return值
            })
        }
    }
}