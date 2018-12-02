/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable func-names */
import React, { Component, Fragment } from 'react';
import Spritesheet from 'react-responsive-spritesheet';
import PropTypes from 'prop-types';

import './Game.scss';

import getNumFrames from '../helpers/getNumFrames';

const AnimationStatus = [
  'idle', // Idle
  'walk', // Move
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
      // players: [
      //   {
      //     name: 'clemm',
      //     hp: 5,
      //     x: 3,
      //     y: 1,
      //     animation: ANIMATION.ATTACK,
      //     sprite: '/assets/sprites/clemm-idle.png',
      //     frames: 3,
      //   },
      //   {
      //     name: 'edgar',
      //     hp: 4,
      //     x: 0,
      //     y: 2,
      //     animation: ANIMATION.IDLE,
      //     sprite: '/assets/sprites/edgar-idle.png',
      //     frames: 3,
      //   },
      // ],
    };

    this.calculateWidth = this.calculateWidth.bind(this);
    this.renderBlock = this.renderBlock.bind(this);
    this.renderSprite = this.renderSprite.bind(this);
  }

  calculateWidth() {
    const { grid, players } = this.props;
    const styleObject = {
      width: `${grid.length * BLOCK_SIZE}px`,
    };

    return styleObject;
  }

  renderBlock(col, row) {
    const { grid, players } = this.props;
    const playerId = grid[row][col] !== -1 ? grid[row][col] : false;
    const player = players[playerId];

    return playerId !== false ? (
      <Fragment>
        {this.renderSprite(player.name, grid[row][col])}
        {/* <div className="player__name">{players[playerId].name}</div>
        <div className="player__animation">{players[playerId].animation}</div> */}
      </Fragment>
    ) : (
      <div style={{ color: 'green' }}>trawa</div>
    );
  }

  renderSprite(characterName, stateNumber) {
    const { grid } = this.props;
    const animationName = `/assets/sprites/${characterName}-${AnimationStatus[stateNumber]}.png`;
    console.log(getNumFrames(animationName));

    return (
      <Spritesheet
        className="my-element__class--style"
        image={animationName}
        widthFrame={32}
        heightFrame={32}
        steps={getNumFrames(animationName)}
        fps={ANIMATION_SPEED}
        direction="forward"
        autoplay
        loop
      />
    );
  }

  // getAnimation(characterName, stateNumber) {
  //   const { grid } = this.props;
  //   console.log(`/assets/sprites/${characterName}-${AnimationStatus[stateNumber]}.png`);
  //   return `/assets/sprites/${characterName}-${AnimationStatus[stateNumber]}.png`;
  // }

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
  // players: PropTypes.arrayOf({}).isRequired,
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

Game.defaultProps = {
  grid: [[-1, -1, -1, -1], [-1, -1, -1, 1], [0, -1, -1, -1], [-1, -1, -1, -1]],
  players: [
    {
      name: 'clemm',
      hp: 5,
      x: 3,
      y: 1,
      animation: ANIMATION.ATTACK,
      sprite: '/assets/sprites/clemm-idle.png',
      frames: 3,
    },
    {
      name: 'edgar',
      hp: 4,
      x: 0,
      y: 2,
      animation: ANIMATION.IDLE,
      sprite: '/assets/sprites/edgar-idle.png',
      frames: 3,
    },
  ],
};
