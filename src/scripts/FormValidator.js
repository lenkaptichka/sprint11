// Класс для валидации полей формы

export default class FormValidator {
    constructor(element) {
        this.element = element;
        this.popupForm = this.element.querySelector('.popup__form'); // Получение формы из попапа
        this.formElements = this.popupForm.elements; // Получение элементов формы
        [this.firstInput, this.secondInput, this.popupButton] = this.formElements; // Получение каждого элемента формы
        this.setEventListeners();
    }

    checkFormValidity(formField, event) {
        const formFieldName = formField.getAttribute('name');
        const errorMessage = document.querySelector(`#popup__error-${formFieldName}`); // Определяем элемент ошибки
        errorMessage.textContent = ''; // При запуске функции сообщение об ошибке всегда отсутствует
    
        const words = {
            emptyField: 'Это обязательное поле',
            validationLenght: 'Должно быть от 2 до 30 символов',
            linkRequired: 'Здесь должна быть ссылка',
            fieldIsValid: ''
        };
    
        if (formField.value.length === 0) {
            errorMessage.textContent = words.emptyField;
        } else if (!formField.validity.valid && formFieldName !== 'link') {
            errorMessage.textContent = words.validationLenght;
        } else if (!formField.validity.valid && formFieldName == 'link') {
            errorMessage.textContent = words.linkRequired;
        } else {
            errorMessage.textContent = words.fieldIsValid;
        }
    }

    checkInputValidity(formField) {
        formField.addEventListener('input', () => {
            this.checkFormValidity(formField);
        });
    }
  
    setSubmitButtonState() {
        if (this.popupForm.checkValidity()) {
            this.popupButton.removeAttribute('disabled');
            this.popupButton.classList.add('popup__button-active');
        } else {
            this.popupButton.setAttribute('disabled', 'true');
            this.popupButton.classList.remove('popup__button-active');
        }
    }

    setEventListeners(element) {
        this.checkInputValidity(this.firstInput);
        this.checkInputValidity(this.secondInput);
        this.setSubmitButtonState();
        this.popupForm.addEventListener('input', this.setSubmitButtonState.bind(this));
    }
}

