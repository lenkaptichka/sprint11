// Класс для работы с данными пользователя

export default class UserInfo {
    constructor({name, info, element, api}) {
        this.authorName = name;
        this.authorInfo = info;
        this.userNameElement = element.querySelector('.user-info__name');
        this.userInfoElement = element.querySelector('.user-info__job');
        this.api = api;
        this.id = null;
        this.updateUserInfo();      
    }

    setUserInfo(authorName, authorInfo) {
        this.authorName = authorName;
        this.authorInfo = authorInfo;
        this.api.editUserProfile(this.authorName, this.authorInfo)

            .catch(err => {
                console.log(err);
            })
        this.updateUserInfo();
    }

    updateUserInfo() {

        this.api.loadUserInfo()
            .then(data => {
                const name = data.name;
                const info = data.about;       
                this.userNameElement.textContent = name;
                this.userInfoElement.textContent = info;
            })

            .catch(err => {
                console.log(err);
            })

    }
}



