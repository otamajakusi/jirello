import { createAction } from 'redux-actions';

import * as At from './actionTypes';

// Jira
export const jiraGetAllProject = createAction(At.JIRA_GET_ALL_PROJECT);
export const jiraFindUsersAssignable = createAction(At.JIRA_FIND_USERS_ASSIGNABLE);
export const jiraGetIssues = createAction(At.JIRA_GET_ISSUES);
