import { ITodo } from ".";

//DOM操作必定会涉及到模板  维护模板
export function todoView ({ id, content, completed }: ITodo): string {
    return `
        <input type="checkbox" ${ completed ? "checked" : '' } data-id=${ id }/>
        <span style="text-decoration: ${ completed ? 'line-through' : 'none' }">${ content }</span>
        <button data-id="${ id }">删除</button>
    `;
}