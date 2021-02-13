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
}
