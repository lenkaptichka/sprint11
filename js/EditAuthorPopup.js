// Класс, реализующий функционал попапа изменения имени и рода деятельности пользователя

class EditAuthorPopup extends Popup {
    constructor(element, userInfo) {
        super(element);
        this.userInfo = userInfo;
        this.editAuthorForm = this.element.querySelector('form');
        this.author = this.editAuthorForm.elements.author;
        this.info = this.editAuthorForm.elements.info;

        this.editAuthorForm.addEventListener('submit', this.submit.bind(this));
    }

    loadUserInfo() {
        this.author.value = document.querySelector('.user-info__name').textContent;
        this.info.value = document.querySelector('.user-info__job').textContent;  
    }

    submit(event) {
        event.preventDefault();
        const authorValue = this.author.value;
        const infoValue = this.info.value;


        this.userInfo.setUserInfo(authorValue, infoValue);
        this.userInfo.updateUserInfo();
        this.close();
        this.loadUserInfo();
    }

    reset() {
        this.editAuthorForm.reset();
    }
}