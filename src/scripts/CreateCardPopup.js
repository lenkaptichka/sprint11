// Класс, реализующий функционал попапа создания новой карточки

import Popup from "./Popup";

export default class CreateCardPopup extends Popup {
    constructor(element, createCard, cardList, api) {
        super(element);
        this.createCard = createCard;
        this.cardList = cardList;
        this.api = api;
        this.newCardForm = this.element.querySelector('form');
        this.name = this.newCardForm.elements.name;
        this.link = this.newCardForm.elements.link;
        this.newCardForm.addEventListener('submit', this.submit.bind(this));   

    }

    submit(event) {
        event.preventDefault();
        this.api.addNewServerCard(this.name.value, this.link.value)
            .then((newCard) => {
                const card = this.createCard(this.name.value, this.link.value, '0');
                this.cardList.addCard(card);
                this.reset();
                this.close();
            })

            

            .catch(err => {
                console.log(err);
            })                
    }

    reset() {
        this.newCardForm.reset();
    }
} 