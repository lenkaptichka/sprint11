// Класс, создающий карточку

export default class Card {
    constructor(nameOfCard, imageOfCard, likeCounter, cardId) {
        this.nameOfCard = nameOfCard;
        this.imageOfCard = imageOfCard;
        this.likeCounter = likeCounter;
        this.cardId = cardId;
        this.element = null;
    }

    like() {
        this.element.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
    }

    remove() {
        this.element.remove();
    }

    create() {
        this.element = document.createElement('div');
        this.element.classList.add('place-card');
        this.element.dataset.id = this.cardId; // Делала, чтобы потом реализовать удаление карточки (оставила на каникулы, боюсь не успеть :( )
        this.element.innerHTML = `<div class="place-card__image" style="background-image: url(${this.imageOfCard})">
            <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name">${this.nameOfCard}</h3>
            <div class="place-card__like-info">
                <button class="place-card__like-icon"></button>
                <h4 class="place-card__like-counter">${this.likeCounter}</h4>           
            </div>         
        </div>`;

        this.element.querySelector('.place-card__delete-icon').addEventListener('click', this.remove.bind(this));
        this.element.querySelector('.place-card__like-icon').addEventListener('click', this.like.bind(this));


        return this.element;
    }
}