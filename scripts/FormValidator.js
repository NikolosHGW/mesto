export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  _initialVariables() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
  }

  //Функция показывает span с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //Функция скрывает span с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  //Функция ищет невалидное свойство в объекте validity в списке инпутов
  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  //Функция меняет активность кнопки в зависимости от валидности свойств в объекте validity
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    }
    else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  //Функция управляет видимостью span-ошибки в зависимости от свойства valid у input полей
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  //Функция вешает на инпуты(поля) определенной формы слушатель события 'input'
  _setEventListeners() {
    this._formElement.addEventListener("submit", evt => {
      evt.preventDefault();
    });
    // const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    // const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    // this._toggleButtonState(this._inputList, this._submitButton, this._inactiveButtonClass);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //Функция выявляет все формы на странице, сбрасывает им дефолтное поведение и передает каждую форму в setEventListeners
  enableValidation() {
    // this._formElement.addEventListener("submit", evt => {
    //   evt.preventDefault();
    // });
    this._initialVariables();
    this._toggleButtonState();
    this._setEventListeners();
    // const formList = Array.from(document.querySelectorAll(obj.formSelector));
    // formList.forEach((formElement) => {
    //   formElement.addEventListener("submit", (evt) => {
    //     evt.preventDefault();
    //   });
    //   setEventListeners(formElement, obj);
    // });
  }
}
