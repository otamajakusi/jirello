import axiosbase from 'axios'

const URL_BASE = 'https://reqres.in/api';

const axios = axiosbase.create({
  baseURL: `${URL_BASE}`,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export function fetchUsers() {
  return axios
    .get('/users')
    .then(res => res.data)
    .catch(error => error)
}

export function fetchUser(id) {
  console.log(id);
  return axios
    .get(`/user/${id}`)
    .then(res => res.data)
    .catch(error => error)
}
