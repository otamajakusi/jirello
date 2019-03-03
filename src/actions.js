import { createAction } from 'redux-actions';

import * as At from './actionTypes';

export const usersFetch = createAction(At.USERS_FETCH);
export const userFetch = createAction(At.USER_FETCH);

// Jira
export const jiraGetAllProjects = createAction(At.JIRA_GET_ALL_PROJECTS);
