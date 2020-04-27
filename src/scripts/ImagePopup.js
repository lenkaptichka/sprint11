// Класс, реализующий функционал попапа окрытия картинки карточки

import Popup from "./Popup";

export default class ImagePopup extends Popup {
    constructor(element) {
        super(element);       
    }

    setBackground(targetImage) {
        const urlString = targetImage.getAttribute('style');
        document.querySelector('.popup__image').setAttribute('src', urlString.slice(urlString.indexOf(`(`) + 1, -1));          
        this.open();
    }
}