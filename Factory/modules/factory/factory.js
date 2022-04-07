/**
 * 
 * 有一些公共的方法属性、静态方法
 * Modal 父类
 * 
 * 对每种状态内部属性加工，或者是每种状态的功能扩展
 * Success Warning Error Modal 不同的类 -> Modal
 * 
 * 有个工厂通过传入的状态来给我自动实例化相应的类
 * Modal Factory ->
 * 
 */
import { ModalType } from "./typing.js";

class Modal {
    constructor (status) {
        this.status = status;
    }

    get className() {
        let classStr = 'modal';
        switch(this.status) {
            case ModalType.SUCCESS:
                classStr += ' success';
                break;
            case ModalType.WARNING:
                classStr += ' warning';
                break;
            case ModalType.ERROR:
                classStr += ' error';
                break;
            default:
                break;
        }

        return classStr;
    }
    //工具函数为静态的
    static outputInfo (info) {
        console.log(info);
    }
}

class SuccessModal extends Modal {
    constructor(title) {
        super(ModalType.SUCCESS);
        this.title = '成功' + title;
    }

    goHome (url) {
        window.location.href = url;
    }
}

class WarningModal extends Modal {
    constructor(title) {
        super(ModalType.WARNING);
        this.title = '告警' + title;
    }

    outputInfo(info) {
        Modal.outputInfo('告警提示: ' + info);
    }
}

class ErrorModal extends Modal {
    constructor(title) {
        super(ModalType.ERROR);
        this.title = '警告' + title;
    }

    outputInfo(info) {
        Modal.outputInfo('失败提示: ' + info);
    }
}

class ModalFactory {
    constructor(dom) {
        this.dom = dom;
    }

    create(title, status) {
        const dom = this.dom;
        let modal = null;

        switch(status) {
            case ModalType.SUCCESS:
                modal = new SuccessModal(title);
                break;
            case Modal.WARNING:
                modal = new WarningModal(title);
                break;
            case Modal.ERROR:
                modal = new ErrorModal(title);
                break;
            default:
                break;
        }

        dom.getElementsByTagName('header')[0].innerText = modal.title;
        dom.className = modal.className;
    }
}

export default ModalFactory;

