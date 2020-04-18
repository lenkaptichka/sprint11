// Класс для всплывающего окна

class Popup {
    constructor(element) {
        this.element = element;
        this.element.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    }

    open() {
        this.element.classList.add('popup_is-opened');
    }

    close() {
        this.element.classList.remove('popup_is-opened');
    }
}