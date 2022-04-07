import Component from "./Component";
import List from "./List";

export interface IInputOptions {
    wrapperEl: HTMLElement;
    placeholderText: string;
    buttonText: string;
}

class Input extends Component {

    private options: IInputOptions;

    constructor(options: IInputOptions) {
        super();
        this.options = options;
    }

    public render () {//供外界todoList调用的渲染方法
        const { placeholderText, buttonText } = this.options;
        this.options.wrapperEl.innerHTML += Component.inputValue(
            placeholderText, 
            buttonText
        );
    }

    public bindEvent () {//供给todoList使用
        const oAddBtn: HTMLElement = document.querySelector('.add-btn');
        const oInput: HTMLElement = document.querySelector('.todo-input');
        oAddBtn.addEventListener('click', this.handleBtnClick.bind(this, oInput), false);//bind到实例上因为事件绑定this默认指向DOM元素
    }

    private handleBtnClick (inputDom) {
        const val: string = inputDom.value.trim();

        if(val.length) {
            List.addItem(val);//调用List的静态方法避免实例化的渲染
            inputDom.value = '';
        }
    }
}
export default Input;