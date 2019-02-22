import React, { Component } from 'react';
import { connect } from 'react-redux'
import Board from 'react-trello';
import './App.css';

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'},
        {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
      ]
    },
    {
      id: 'lane2',
      title: 'Completed',
      label: '0/0',
      cards: []
    }
  ]
}

class App extends Component {
  render() {
    return (
      <Board
        data={data}
        draggable
        laneDraggable={false}
        cardDraggable
      />
    );
  }
}

export default App;
