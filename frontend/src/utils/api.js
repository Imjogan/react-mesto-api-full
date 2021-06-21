class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  #currentToken = '';
  set currentToken(value) {
    this.#currentToken = value;
  }

  // получаем информацию о карточках
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.#currentToken}`
      },
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // получаем информацию о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.#currentToken}`
      },
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialData() {
    return Promise.all([this.getCards(), this.getUserInfo()]);
  }

  // отправляем информацию о пользователе
  setUserInfo(name, status) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.#currentToken}`
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: status,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // создаем карточку
  createCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.#currentToken}`
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // удаляем карточку
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.#currentToken}`
      },
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // ставим/убираем лайк
  toggleCardLike(cardId, hasLike) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: hasLike ? 'DELETE' : 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.#currentToken}`
      },
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // обновляем аватар
  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.#currentToken}`
      },
      credentials: 'include',
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

// создаем класс для связи с сервером
const api = new Api({
  baseUrl: 'https://api.mesto.mjogan.nomoredomains.club',
});

export default api;
