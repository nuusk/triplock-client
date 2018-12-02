/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable func-names */
import React, { Component, Fragment } from 'react';
import Spritesheet from 'react-responsive-spritesheet';
import PropTypes from 'prop-types';

import './Game.scss';

const AnimationStatus = [
  'idle', // Idle
  'move', // Move
  'attack', // Attack
  'defend', // Defend
  'special', // Special
  'collide', // Colide
  'hit', // IdleHurt
  'hit', // MoveHurt
  'hit', // AttackHurt
  'hit', // SpecialHurt
  'hit', // ColideHurt
  'dead', // Death
];

const ANIMATION = require('../resources/animations');

const BLOCK_SIZE = 140;
const ANIMATION_SPEED = 8;

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
          sprite: '/assets/sprites/edgar-idle.png',
          frames: 3,
        },
      ],
    };

    this.calculateWidth = this.calculateWidth.bind(this);
    this.renderBlock = this.renderBlock.bind(this);
  }

  calculateWidth() {
    const { grid } = this.props;
    // console.log(grid);
    const styleObject = {
      width: `${grid.length * BLOCK_SIZE}px`,
    };

    return styleObject;
  }

  renderBlock(col, row) {
    const { players } = this.state;
    const { grid } = this.props;
    // const { status } = this.props;
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
    const { grid } = this.props;

    return (
      <section className="game container with-title">
        <h2 className="title">Game</h2>
        <div className="game-grid" style={this.calculateWidth()}>
          {grid.map((col, colIndex) => (
            <div key={colIndex} className="game-grid__column">
              {col.map((row, rowIndex) => (
                <div key={rowIndex} className="game-grid__block">
                  {this.renderBlock(colIndex, rowIndex)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  }
}

Game.propTypes = {
  status: PropTypes.shape({
    animation: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

Game.defaultProps = {
  grid: [[-1, -1, -1, -1], [-1, -1, -1, 1], [0, -1, -1, -1], [-1, -1, -1, -1]],
};
