import React, { Component } from 'react';

import './Game.scss';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section className="game container with-title">
        <h2 className="title">Game</h2>
        <img src="/mockup-game.png" alt="" />
      </section>
    );
  }
}
