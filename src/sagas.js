import {
  call,
  put,
  fork,
  take,
  cancel,
  takeEvery, takeLatest, takeLeading
} from 'redux-saga/effects'
import * as JiraApi from './jira_api';
import * as At from './actionTypes';

function* jiraGetAllProject(action) {
  try {
    const data = yield call(JiraApi.getAllProject, action.payload);
    yield put({type: At.JIRA_GET_ALL_PROJECT_OK, payload: data});
  } catch (e) {
    yield put({type: At.JIRA_GET_ALL_PROJECT_NG, payload: e.message});
  }
}

function* jiraFindUsersAssignable(action) {
  try {
    const data = yield call(JiraApi.findUsersAssignable, action.payload);
    yield put({type: At.JIRA_FIND_USERS_ASSIGNABLE_OK, payload: data, project: action.payload});
  } catch (e) {
    yield put({type: At.JIRA_FIND_USERS_ASSIGNABLE_NG, payload: e.message});
  }
}

function* jiraGetIssues(action) {
  try {
    const project = action.payload.project;
    const startAt = action.payload.startAt;
    const data = yield call(JiraApi.getIssues, project, startAt);
    yield put({type: At.JIRA_GET_ISSUES_OK, payload: data, project});
  } catch (e) {
    yield put({type: At.JIRA_GET_ISSUES_NG, payload: e.message});
  }
}

// if pattern & customPattern task is running, skip forking
const takeEveryCustom = (pattern, saga, customPattern) => fork(function*() {
  const lastTasks = {};
  while (true) {
    const action = yield take(pattern);
    const subType = customPattern ? customPattern(action) : action.payload;
    if (lastTasks[subType] && lastTasks[subType].isRunning()) {
      continue;
    }
    lastTasks[subType] = yield fork(saga, action);
  }
})

function* mySaga() {
  yield takeLatest(At.JIRA_GET_ALL_PROJECT, jiraGetAllProject);
  yield takeEveryCustom(At.JIRA_FIND_USERS_ASSIGNABLE, jiraFindUsersAssignable);
  yield takeEveryCustom(At.JIRA_GET_ISSUES, jiraGetIssues, action => action.payload.project);
}

export default mySaga;
