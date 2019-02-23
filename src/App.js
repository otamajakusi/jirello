import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal';
import Board from 'react-trello';

import Button from '@material-ui/core/Button';

import ButtonAppBar from './appbar';
import './App.css';
import {
  usersFetch,
  userFetch
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
    firebase.auth().onAuthStateChanged(account => {
      console.log(account);
      this.setState({ account })
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    console.log(prevState);
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
    const {page, totalPages} = this.props;
    if (page && totalPages && page < totalPages) {
      // FIXME: warning should be removed.
      this.props.dispatch(usersFetch(page + 1));
    }
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

function mapStateToProps(state) {
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
  const lane = {
    id: 'lane1',
    title: 'title1',
    label: `${laneTitle}`,
    cards: cards,
  };
  return {
    board: {lanes: [lane]},
    page: users && users.page,
    totalPages: users && users.total_pages,
  };
}

export default connect(mapStateToProps)(App);
