import axiosbase from 'axios'

const URL_BASE = 'https://reqres.in/api';

const axios = axiosbase.create({
  baseURL: `${URL_BASE}`,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export function fetchUsers(page) {
  return axios
    .get(`/users?page=${page}`)
    .then(res => res.data)
    .catch(error => error)
}

export function fetchUser(id) {
  return axios
    .get(`/user/${id}`)
    .then(res => res.data)
    .catch(error => error)
}
