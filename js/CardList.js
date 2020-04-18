// Класс для хранения и отрисовки карточек

class CardList {
    constructor(container, initCards, api) {
        this.container = container;
        this.initCards = initCards;
        this.api= api;
        
    }

    addCard(card) {
        const cardElem = card.create();
        this.container.appendChild(cardElem);
    }

    render() {
        this.api.loadDefaultCatds()
            .then((serverCard) => {
                serverCard.forEach(data => {
                    const numberOfLikes = data.likes.length; // Вычисление количества поставленных лайков
                    const card = this.initCards(data.name, data.link, numberOfLikes, data._id);
                    this.addCard(card);
                })

            })

        .catch(err => {
            console.log(err);
        })
    }
}
