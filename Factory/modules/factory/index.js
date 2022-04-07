import ModalFatory from './factory.js';

;(() => {

    const oModal = document.getElementsByClassName('modal')[0];
    const oBtngroup = document.getElementsByClassName('btn-group')[0];
    const modalFactory = new ModalFatory(oModal);

    const init = () => {
        bindEvent();
    }

    function bindEvent () {
        oBtngroup.addEventListener('click', handleBtnClick, false);
    }

    function handleBtnClick (e) {
        const tar = e.target;
        const tagName = tar.tagName.toLowerCase();

        if(tagName === 'button') {
            const status = tar.dataset.status;
            modalFactory.create('这是一个工厂模式的应用场景', status);
        }
    }

    init();
})();