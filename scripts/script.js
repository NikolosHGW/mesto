let popup = document.querySelector(".popup");
let eddButton = document.querySelector(".profile__edit-button");
let clsButton = popup.querySelector(".popup__close-icon");
let profile = document.querySelector(".profile");
let formElement = document.querySelector(".popup__form");

function clsPopup() {
  popup.classList.remove("popup_opened");
}

eddButton.addEventListener("click", function() {
  popup.classList.add("popup_opened");
  popup.querySelector(".popup__edit-name").value = profile.querySelector(".profile__name").textContent;
  popup.querySelector(".popup__edit-job").value = profile.querySelector(".profile__job").textContent;
});

clsButton.addEventListener("click", function() {
  clsPopup();
});

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInput = popup.querySelector(".popup__edit-name");
  let jobInput = popup.querySelector(".popup__edit-job");

  profile.querySelector(".profile__name").textContent = nameInput.value;
  profile.querySelector(".profile__job").textContent = jobInput.value;
  clsPopup();
}

formElement.addEventListener('submit', formSubmitHandler);
