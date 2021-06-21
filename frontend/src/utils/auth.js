export const BASE_URL = 'https://api.mesto.mjogan.nomoredomains.club';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then((response) => {
    return response.json();
  });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  })
    .then((response) => response.json())
    .then((token) => {
      if (token) {
        localStorage.setItem('token', token);
        return token;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data});
};
