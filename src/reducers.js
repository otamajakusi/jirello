import * as At from './actionTypes';

const initialState = {
  jira: {
    projects: [],
    users: {},
    issues: {},
  },
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    // 
    case At.JIRA_GET_ALL_PROJECT_OK:
      return {
        ...state,
        jira: {
          ...state.jira,
          projects: action.payload,
        }
      };
    case At.JIRA_GET_ALL_PROJECT_NG:
      return state;

    case At.JIRA_GET_ISSUES_OK: {
      const project = action.project;
      const issues = state.jira.issues;
      return {
        ...state,
        jira: {
          ...state.jira,
          issues: {
            ...issues,
            [project]: {
              ...action.payload,
              ...state.jira.issues[project]
            }
          }
        }
      };
    }
    case At.JIRA_GET_ISSUES_NG:
      return state;

    case At.JIRA_FIND_USERS_ASSIGNABLE_OK: {
      const project = action.project;
      const users = state.jira.users;
      return {
        ...state,
        jira: {
          ...state.jira,
          users: {
            ...users,
            [project]: action.payload,
          }
        }
      };
    }
    case At.JIRA_FIND_USERS_ASSIGNABLE_NG:
      return state;

    default:
      return state;
  };
}

export default Reducer;
