let popup = document.querySelector(".popup");
let eddButton = document.querySelector(".profile__edit-button");
let clsButton = popup.querySelector(".popup__close-icon");
let profile = document.querySelector(".profile");
let formElement = document.querySelector(".popup__form");
let nameInput = popup.querySelector(".popup__edit-name");
let jobInput = popup.querySelector(".popup__edit-job");
let profName = profile.querySelector(".profile__name");
let profJob = profile.querySelector(".profile__job");

function clsPopup() {
  popup.classList.remove("popup_opened");
}

eddButton.addEventListener("click", function() {
  popup.classList.add("popup_opened");
  nameInput.value = profName.textContent;
  jobInput.value = profJob.textContent;
});

clsButton.addEventListener("click", function() {
  clsPopup();
});

function formSubmitHandler(evt) {
  evt.preventDefault();

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;
  clsPopup();
}

formElement.addEventListener('submit', formSubmitHandler);
