import React, { Component } from 'react';
import GameScreen from '../components/GameScreen/GameScreen';

import './Game.scss';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [1, 2, 3],
    };
  }

  render() {
    const { grid } = this.state;

    return (
      <section className="game container with-title">
        <h2 className="title">Game</h2>
        <div className="game-grid">
          {grid.map(block => (
            <div className="game-grid__block">asd</div>
          ))}
        </div>
      </section>
    );
  }
}
