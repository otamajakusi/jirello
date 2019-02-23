import { call, put, takeLatest } from 'redux-saga/effects'
import * as Api from './api';
import * as At from './actionTypes';

function* fetchUsers(action) {
  try {
    const data = yield call(Api.fetchUsers, action.payload);
    yield put({type: At.USERS_FETCH_OK, payload: data});
  } catch (e) {
    yield put({type: At.USERS_FETCH_NG, payload: e.message});
  }
}

function* fetchUser(action) {
  try {
    const data = yield call(Api.fetchUser, action.payload);
    yield put({type: At.USER_FETCH_OK, payload: data});
  } catch (e) {
    yield put({type: At.USER_FETCH_NG, payload: e.message});
  }
}

function* mySaga() {
    yield takeLatest(At.USER_FETCH, fetchUser);
    yield takeLatest(At.USERS_FETCH, fetchUsers);
}

export default mySaga;
