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
      players: [
        {
          name: 'Miszoł',
          hp: 5,
          x: 3,
          y: 1,
        },
        {
          name: 'Mati mistrz',
          hp: 4,
          x: 0,
          y: 2,
        },
      ],
    };

    this.calculateWidth = this.calculateWidth.bind(this);
    this.renderBlock = this.renderBlock.bind(this);
  }

  calculateWidth() {
    const { rows } = this.state;
    const styleObject = {
      width: `${rows.length * BLOCK_SIZE}px`,
    };

    return styleObject;
  }

  renderBlock(col, row) {
    const { players } = this.state;

    return `${col}, ${row}`;
  }

  render() {
    const { rows, cols, players } = this.state;
    console.log(players);

    return (
      <section className="game container with-title">
        <h2 className="title">Game</h2>
        <div className="game-grid" style={this.calculateWidth()}>
          {cols.map((col, colIndex) => (
            <div className="game-grid__column">
              {rows.map((row, rowIndex) => (
                <div className="game-grid__block">{this.renderBlock(colIndex, rowIndex)}</div>
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  }
}
