'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal';
import Board from 'react-trello';

import Button from '@material-ui/core/Button';

import NavigationBar from './navigation_bar';
import './App.css';
import {
  jiraGetAllProjects,
  jiraGetIssues,
  jiraFindUsersAssignable,
  jiraGetAllProject,
} from './actions';
import firebase from './firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      account: null,
      assignee: [],
      selectedProjs: [],
    };
    // TODO: shouldComponentUpdate() will handle this state
    this.fetchIssues = {};
  }

  componentDidMount() {
    this.props.dispatch(jiraGetAllProject());
    firebase.auth().onAuthStateChanged(account => {
      this.setState({ account })
    });
  }

  componentDidUpdate() {
    const { projects, users, issues } = this.props.jira;
    if (projects && projects.length === 0) {
      return;
    }
    projects.forEach(proj => {
      if (users[proj.key]) {
        return;
      }
      this.props.dispatch(jiraFindUsersAssignable(proj.key));
    });

    projects.forEach(proj => {
      const prjIss = issues[proj.key];
      if (!prjIss) {
        if (this.fetchIssues[proj.key] === undefined) {
          this.props.dispatch(jiraGetIssues({project: proj.key, startAt: 0}));
          this.fetchIssues[proj.key] = 0;
        }
      } else if (prjIss.issues.length < prjIss.total) {
        if (this.fetchIssues[proj.key] === prjIss.startAt) {
          const startAt = prjIss.startAt + prjIss.maxResults;
          this.props.dispatch(jiraGetIssues({project: proj.key, startAt}));
          this.fetchIssues[proj.key] = startAt;
        }
      }
    });
  }

  onCardClick = (cardId, metadata, laneId) => {
    console.log(cardId, metadata, laneId);
  }

  openModal = (avatar) => {
    this.setState({modalIsOpen: true, avatar});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  logout = () => {
    firebase.auth().signOut();
  }

  // TODO: move to navigation_bar
  renderLoggin = () => {
    if (this.state.account) {
      return <Button onClick={this.logout}>Google LOGOUT</Button>
    } else {
      return <Button onClick={this.login}>Google LOGIN</Button>
    }
  }

  createProjectCards = (project, issueStatus) => {
    const { issues } = this.props.jira;
    if (!issues || !issues[project]) {
      return [];
    }
    const cards = issues[project].issues
      .filter(i => {
        if (Array.isArray(issueStatus)) {
          return issueStatus.includes(i.fields.status.name);
        } else {
          return i.fields.status.name === issueStatus
        }
      })
      .map(i => {
        return ({
          id: `${i.id}`,
          title: i.key,
          description: i.fields.summary,
          //description: d.avatar,
          //metadata: {avatar: d.avatar},
          //label: i.key,
          //tags: tags,
        });
      });
    return cards;
  }

  selectedProjects = () => {
    const { projects } = this.props.jira;
    if (this.state.selectedProjs.length) {
      return this.state.selectedProjs;
    }
    if (projects && projects.length) {
      return projects.map(p => p.key);
    }
    return [];
  }

  createCards = () => {
    const { projects } = this.props.jira;
    const issueStatuses = [
      'BACKLOG',
      ['Doing', 'In Progress'],
      ['Review', 'Code Review'],
      'CLOSE',
    ];
    const selectedProjs = this.selectedProjects();
    const cards = issueStatuses.map(issueStatus => {
      let laneCards = [];
      selectedProjs.forEach(p => {
        laneCards = laneCards.concat(this.createProjectCards(p, issueStatus));
      });
      return {
        id: issueStatus,
        title: issueStatus,
        label: laneCards.length,
        cards: laneCards,
      };
    });
    return cards;
  }

  render() {
    const { projects, users, issues } = this.props.jira;
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          {this.state.avatar &&
            <div>
              <img src={this.state.avatar} />
              {this.state.avatar}
            </div>
          }
        </Modal>
        <NavigationBar
          title={'AppBar'}
          projects={(projects && projects.map(p => p.key)) || []}
          selected={this.state.selectedProjs}
          onSelect={event => this.setState({selectedProjs: event.target.value})}
          button={this.renderLoggin()} />
        <Board
          data={{lanes: this.createCards()}}
          draggable={true}
          laneDraggable={false}
          cardDraggable={true}
          onCardClick={this.onCardClick}
          onLaneScroll={this.onLaneScroll}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
