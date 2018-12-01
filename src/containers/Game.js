import React, { Component } from 'react';
import GameScreen from '../components/GameScreen/GameScreen';

import './Game.scss';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [1, 1, 1, 1],
      cols: [1, 1, 1, 1, 1, 1, 1],
      // grid: [1, 2, 3],
    };
  }

  render() {
    const { rows, cols } = this.state;

    return (
      <section className="game container with-title">
        <h2 className="title">Game</h2>
        <div className="game-grid">
          {cols.map(column => (
            <div className="game-grid__column">
              {rows.map(block => (
                <div className="game-grid__block">block</div>
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  }
}
