import TodoList from "./TodoList";

;((doc) => {

    const oInput: HTMLInputElement = doc.querySelector('input');//因为需要访问它底下的value属性所以需要精确
    const oAddBtn: HTMLElement = doc.querySelector('.add-btn');
    const oTodoList: HTMLElement = doc.querySelector('.todo-list');

    const todoList = TodoList.create(oTodoList);

    const init = ():void => {
        bindEvent();
    }

    function bindEvent () {
        oAddBtn.addEventListener('click', handleAddBtnClick, false);
        oTodoList.addEventListener('click', handleListClick, false);
    }

    function handleAddBtnClick () { 
        const val: string = oInput.value.trim();

        if(!val.length) {
            return;
        }

        todoList.addItem({
            id: new Date().getTime(),
            content: val,
            completed: false
        });
        oInput.value = '';

    }

    function handleListClick (e: MouseEvent) {//通过事件对象参数找到事件源对象
        const tar = e.target as HTMLElement;
        const tagName = tar.tagName.toLowerCase();//tagName原来是大写转成小写

        if(tagName === 'input' || tagName === 'button') {
            const id: number = parseInt(tar.dataset.id); 

            switch(tagName) {
                case 'input':
                    todoList.toggleCompleted(id);
                    break;
                case 'button':
                    todoList.removeItem(id);
                    break;
                default:
                    break;
            }
        }
    }

    init();

})(document);//习惯是把一个全局的变量作为一个形参变成一个作用域内部的临时变量
