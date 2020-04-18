/* Переменные */

const placesList = document.querySelector('.places-list');

const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort9',
    userToken: 'a6142428-eecb-43e3-9a6f-20c6d4937a9d'
});


const userInfo = new UserInfo({
    element: document,
    api: api
});


// Отрисовка карточек
const newCard = (nameOfCard, imageOfCard, likeCounter, cardId) => new Card(nameOfCard, imageOfCard, likeCounter, cardId);
const cardList = new CardList(placesList, newCard, api);
cardList.render();

// Попапы
const imagePopup = new ImagePopup(document.querySelector('#zoom-image'));
const editAuthorPopup = new EditAuthorPopup(document.querySelector('#edit-author'), userInfo);
const createCardPopup = new CreateCardPopup(document.querySelector('#create-card'), newCard, cardList, api);

// Валидаторы форм
const editFormValidity = new FormValidator(document.querySelector('#edit-author'));
const newCardFormValidity = new FormValidator(document.querySelector('#create-card'));


/* Слушатели событий */

// Открытие формы добавления новой карточки со сбросом полей ввода
document.querySelector('.user-info__button').addEventListener('click', function (event) {
    createCardPopup.reset();
    createCardPopup.open();
});

// Открытие формы добавления изменения информации о пользователе со сбросом полей ввода
document.querySelector('.user-info__edit-button').addEventListener('click', function (event) {
    editAuthorPopup.open();
    editAuthorPopup.reset();
    editAuthorPopup.loadUserInfo();

});

// Открытие картинки с карточки
placesList.addEventListener('click', function (event) {
    if (event.target.classList.contains('place-card__image')) {
        imagePopup.setBackground(event.target);
    }
});

