import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as Api from './api';
import * as At from './actionTypes';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {
    const data = yield call(Api.fetchUser);
    yield put({type: At.USER_FETCH_OK, data: data});
  } catch (e) {
    yield put({type: At.USER_FETCH_NG, message: e.message});
  }
}

function* mySaga() {
    yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;
