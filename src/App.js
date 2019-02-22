import React, { Component } from 'react';
import { connect } from 'react-redux'
import Board from 'react-trello';
import './App.css';
import {
  usersFetch,
  userFetch
} from './actions';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(usersFetch());
  }

  onCardClick = (cardId, metadata, laneId) => {
    console.log(cardId);
    this.props.dispatch(userFetch(cardId));
  }

  render() {
    console.log(this.props);
    return (
      <Board
        data={this.props.data}
        draggable={true}
        laneDraggable={false}
        cardDraggable={true}
        onCardClick={this.onCardClick}
      />
    );
  }
}

function mapStateToProps(state) {
  console.log('mapstate', state);
  const users = state.users;
  let cards = [];
  if (users && users.data) {
    cards = users.data.map(d => {
      return ({
        id: `${d.id}`,
        title: `${d.first_name} ${d.last_name}`,
        description: d.avatar,
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
  return {data: {lanes: [lane]}};
}

export default connect(mapStateToProps)(App);
