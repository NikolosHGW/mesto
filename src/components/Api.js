export default class Api {
  constructor(options) {
    this.options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfoUser() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    })
      .then(this._checkResponse);
  }

  setInfoUser(name, job){
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        about: job
      })
    })
      .then(this._checkResponse);
  }

  getInitialCard() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    })
      .then(this._checkResponse);
  }

  createCard({name, link}) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this.options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then(this._checkResponse);
  }

  putLike(id) {
    return fetch(`${this.options.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.options.headers
    })
      .then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this.options.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.options.headers
    })
      .then(this._checkResponse);
  }

  changeAvatar(avatar) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._checkResponse);
  }
}
