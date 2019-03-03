import { call, put, fork, takeEvery, takeLatest } from 'redux-saga/effects'
import * as Api from './api';
import * as JiraApi from './jira_api';
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

function* jiraGetAllProjects(action) {
  try {
    const data = yield call(JiraApi.getAllProjects, action.payload);
    console.log(data);
    yield put({type: At.JIRA_GET_ALL_PROJECTS_OK, payload: data});
  } catch (e) {
    yield put({type: At.JIRA_GET_ALL_PROJECTS_NG, payload: e.message});
  }
}
function* mySaga() {
  yield takeLatest(At.USERS_FETCH, fetchUsers);
  yield takeLatest(At.USER_FETCH, fetchUser);
  // Jira
  yield takeLatest(At.JIRA_GET_ALL_PROJECTS, jiraGetAllProjects);
}

export default mySaga;
