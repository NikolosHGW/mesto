const formList = Array.from(document.querySelectorAll(".popup__form"));


//Функция показывает span с ошибкой
function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

//Функция скрывает span с ошибкой
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

//Функция управляет видимостью span-ошибки в зависимости от свойства valid у input полей
function isValid(formElement, inputElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  }
  else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

//Функция ищет невалидное свойство в объекте validity в списке инпутов
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid)
}

//Функция меняет активность кнопки в зависимости от валидности свойств в объекте validity
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

//Функция вешает на инпуты(поля) определенной формы слушатель события 'input'
function setEventListeners(formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, obj.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, obj.inputErrorClass, obj.errorClass);
      toggleButtonState(inputList, buttonElement, obj.inactiveButtonClass);
    });
  });
}

//Функция выявляет все формы на странице, сбрасывает им дефолтное поведение и передает каждую форму в setEventListeners
function enableValidation(obj) {
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, obj);
  });
}


enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
});
