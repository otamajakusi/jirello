import axiosbase from 'axios'
import JiraClient from 'jira-connector';

const jira = new JiraClient({
  host: process.env.REACT_APP_JIRA_HOST,
  basic_auth: {
    username: process.env.REACT_APP_JIRA_USERNAME,
    password: process.env.REACT_APP_JIRA_PASSWORD,
  }
});

const axios = axiosbase.create({
  baseURL: process.env.REACT_APP_JIRA_HOST,
  headers: {
    'Content-Type': 'application/json'
  },
  auth: {
    username: process.env.REACT_APP_JIRA_USERNAME,
    password: process.env.REACT_APP_JIRA_PASSWORD,
  },
  responseType: 'json',
});

export function getAllProjects() {
  return axios
    .get(`/rest/api/2/project`)
    .then(res => res.data)
    .catch(error => error)
}

// TODO: jql is not appropriate.
export function getIssues(startAt, maxResults = 100, project = 'YAD') {
  const query = `fields=project,summary,assignee,components,created,issuetype,labels,subtasks,status,self`;
  const jql = `status!=CLOSE&project=${project}&startAt=${startAt}&maxResults=${maxResults}`;
  return axios
    .get(`/rest/api/2/search?jql=${jql}&${query}`)
    .then(res => res.data)
    .catch(error => error)
}
