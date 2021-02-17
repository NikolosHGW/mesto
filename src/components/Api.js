export default class Api {
  constructor(options) {
    this.options = options;
  }

  getInfoUser() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  setInfoUser({ name, job }){
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        about: job
      })
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        }
      })
  }

  getInitialCard() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteCard(id) {
    return fetch(`${this.options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return Promise.resolve();
      })
  }

  putLike(id) {
    return fetch(`${this.options.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteLike(id) {
    return fetch(`${this.options.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  changeAvatar(avatar) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}
