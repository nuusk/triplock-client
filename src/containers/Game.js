import React, { Component } from 'react';
import GameScreen from '../components/GameScreen/GameScreen';

import './Game.scss';

const BLOCK_SIZE = 200;

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [1, 1, 1, 1],
      cols: [1, 1, 1, 1],
      // grid: [1, 2, 3],
    };

    this.calculateWidth = this.calculateWidth.bind(this);
  }

  calculateWidth() {
    const { rows } = this.state;
    const styleObject = {
      width: `${rows.length * BLOCK_SIZE}px`,
    };

    console.log(styleObject);

    return styleObject;
  }

  render() {
    const { rows, cols } = this.state;

    return (
      <section className="game container with-title">
        <h2 className="title">Game</h2>
        <div className="game-grid" style={this.calculateWidth()}>
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
