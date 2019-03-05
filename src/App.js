import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal';
import Board from 'react-trello';

import Button from '@material-ui/core/Button';

import ButtonAppBar from './appbar';
import './App.css';
import {
  usersFetch,
  userFetch,
  jiraGetAllProjects,
  jiraGetIssues
} from './actions';
import firebase from './firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      avatar: null,
      account: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(usersFetch(1));
    this.props.dispatch(jiraGetAllProjects());
    this.props.dispatch(jiraGetIssues(0));
    firebase.auth().onAuthStateChanged(account => {
      this.setState({ account })
    });
  }

  componentDidUpdate() {
    const { page, totalPages } = this.props;
    if (page && totalPages && page <= totalPages) {
      this.props.dispatch(usersFetch(page + 1));
    }
    const { startAt, maxResults, total, issues } = this.props;
    if (startAt + maxResults && total && issues &&
      issues.length < total) {
      const next = startAt + maxResults;
      this.props.dispatch(jiraGetIssues(next));
    }
  }

  onCardClick = (cardId, metadata, laneId) => {
    this.props.dispatch(userFetch(cardId));
    if (metadata && metadata.avatar) {
      this.openModal(metadata.avatar);
    }
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

  renderLoggin = () => {
    if (this.state.account) {
      return <Button onClick={this.logout}>Google LOGOUT</Button>
    } else {
      return <Button onClick={this.login}>Google LOGIN</Button>
    }
  }

  render() {
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
        <ButtonAppBar title={'AppBar'} button={this.renderLoggin()} />
        <Board
          data={this.props.board}
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

const createUserLane = state => {
  const users = state.users;
  let cards = [];
  if (users && users.data) {
    cards = users.data.map(d => {
      const tags = d.color && [{
        title: d.color,
        bgcolor: d.color,
      }];
      return ({
        id: `${d.id}`,
        title: `${d.first_name} ${d.last_name}`,
        description: d.avatar,
        metadata: {avatar: d.avatar},
        label: d.pantone_value,
        tags: tags,
      });
    });
  }
  const laneTitle
    = users && users.data ? `${users.data.length}/${users.total}` : '';
  return {
    id: 'user lane',
    title: 'title1',
    label: laneTitle,
    cards: cards,
  };
}

const createJiraLane = (state,issueStatus) => {
  const jira = state.jira;
  let cards = [];
  if (jira && jira.issues) {
    cards = jira.issues
      .filter(i => {
        //console.log(i.fields.status.name);
        return i.fields.status.name === issueStatus
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
  }
  return {
    id: issueStatus,
    title: issueStatus,
    label: cards.length,
    cards: cards,
  };
}

function mapStateToProps(state) {
  const users = state.users;
  const jira = state.jira;
  const lane1 = createUserLane(state);
  const lane2 = createJiraLane(state, 'BACKLOG');
  const lane3 = createJiraLane(state, 'Doing');
  const lane4 = createJiraLane(state, 'Review');
  return {
    board: {lanes: [lane1, lane2, lane3, lane4]},
    page: users && users.page,
    totalPages: users && users.total_pages,
    startAt: jira && jira.startAt,
    maxResults: jira && jira.maxResults,
    total: jira && jira.total,
    issues: jira && jira.issues,
  };
}

export default connect(mapStateToProps)(App);
