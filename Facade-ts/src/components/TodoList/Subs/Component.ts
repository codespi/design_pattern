import { ITodoData } from "../../../typings";

abstract class Component {//抽象类暴露  React类组件稍微理解一下 管理组件的视图
    protected static inputValue (placeholderText: string, buttonText: string) {
        return `
        <div>
            <input type="text" class="todo-input" placeholder="${ placeholderText }" />
            <button class="add-btn">${ buttonText }</button>
        </div>
        `
    }

    protected static listView (data: ITodoData[]): string {
        return `
        <div class="todo-list">
        ${
            data.length ?
            data.map((todo: ITodoData) => {
                return Component.todoView(todo);
            })
            :
            '什么都没有哦'
        }
        </div>
        `.split(',').join('')
    }

    protected static todoView (todo: ITodoData): string {
        const { id, content, completed } = todo;

        return `
            <div class="todo-item">
                <input type="checkbox" data-id="${ id }" ${ completed ? 'checked' : '' }/>
                <span style="text-decoration: ${ completed ? 'line-through' : '' }">${ content }</span>
                <button data-id=${ id }>删除</button>
            </div>
        `
    }
}
export default Component;