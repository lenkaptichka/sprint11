// Класс, реализующий работу с сервером

class Api {
    constructor({baseUrl, userToken}) {
        this.baseUrl = baseUrl;
        this.userToken = userToken;
    }

    // Загрузка информации о пользователе с сервера
    loadUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this.userToken
            }
        })
            .then(res => this.parseResponce(res))
    }

    // Загрузка первоначальных карточек с сервера
    loadDefaultCatds() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this.userToken
            }
        })

            .then(res => this.parseResponce(res))
    }

    // Редактирование профиля пользователя
    editUserProfile(newName, newAbout) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.userToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${newName}`,
                about: `${newAbout}`
            })
        })

            .then(res => this.parseResponce(res))
    }

    // Добавление новой карточки
    addNewServerCard(cardName, cardLink) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.userToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${cardName}`,
                link: `${cardLink}`
            })
        })

            .then(res => this.parseResponce(res))

            .then(data => console.log(data));
    }

    parseResponce(res) {
        if (res.ok) {
            return res.json()
        }
    
        return Promise.reject(`Ошибка: ${res.status}`);
      }
}