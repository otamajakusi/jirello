import axiosbase from 'axios'

const URL_BASE = 'https://reqres.in/api';

const axios = axiosbase.create({
  baseURL: `${URL_BASE}/users`,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export function fetchUser() {
  axios
    .get('/user')
    .then(res => res.data)
    .catch(error => error)
}
