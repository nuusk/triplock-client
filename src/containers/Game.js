import React, { Component, Fragment } from 'react';
import Spritesheet from 'react-responsive-spritesheet';

import './Game.scss';

const ANIMATION = require('../resources/animations');
const CARD = require('../resources/cards');

const BLOCK_SIZE = 140;
const ANIMATION_SPEED = 8;

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
          animation: ANIMATION.ATTACK,
          sprite: '/assets/sprites/clemm-idle.png',
          frames: 3,
        },
        {
          name: 'Mati mistrz',
          hp: 4,
          x: 0,
          y: 2,
          animation: ANIMATION.IDLE,
          sprite: '/assets/sprites/edgar-attack.png',
          frames: 5,
        },
      ],
      // prettier-ignore
      grid: [
        [-1, -1, -1, -1],
        [-1, -1, -1, 1],
        [0, -1, -1, -1],
        [-1, -1, -1, -1],
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
    const { grid, players } = this.state;
    const playerId = grid[row][col] !== -1 ? grid[row][col] : false;
    const player = players[playerId];

    return playerId !== false ? (
      <Fragment>
        <Spritesheet
          className="my-element__class--style"
          image={player.sprite}
          widthFrame={32}
          heightFrame={32}
          steps={player.frames}
          fps={ANIMATION_SPEED}
          direction="forward"
          autoplay
          loop
        />
        {/* <div className="player__name">{players[playerId].name}</div>
        <div className="player__animation">{players[playerId].animation}</div> */}
      </Fragment>
    ) : (
      <div style={{ color: 'green' }}>trawa</div>
    );
  }

  render() {
    const { rows, cols, players } = this.state;

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
