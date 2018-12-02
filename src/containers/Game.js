/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable func-names */
import React, { Component, Fragment } from 'react';
import Spritesheet from 'react-responsive-spritesheet';
import PropTypes from 'prop-types';

import './Game.scss';

import getNumFrames from '../helpers/getNumFrames';
import getCharacterName from '../helpers/getCharacterName';

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

// const ANIMATION = require('../resources/animations');

const BLOCK_SIZE = 140;
const ANIMATION_SPEED = 5;

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {};

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
    let animationState = false;
    if (grid[row][col] !== -1) {
      animationState = players[grid[row][col]].animation;
      // console.log(animationState);
    }
    // console.log(grid[row][col]);
    // console.log(players);
    // const animationState = grid[row][col] !== -1 ? players[grid[row][col]] : false;
    // console.log(animationState);

    return playerId !== false ? (
      <Fragment>
        {this.renderSprite(getCharacterName(playerId), animationState)}
        {/* <div className="player__name">{players[playerId].name}</div>
        <div className="player__animation">{players[playerId].animation}</div> */}
      </Fragment>
    ) : (
      <div style={{ color: 'green' }}>trawa</div>
    );
  }

  renderSprite(characterName, stateNumber) {
    // console.log(characterName);
    const { grid } = this.props;
    const animationName = `/assets/sprites/${characterName}-${AnimationStatus[stateNumber]}.png`;
    // console.log(getNumFrames(animationName));
    // console.log(animationName);

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

  render() {
    const { grid } = this.props;

    return (
      <section className="game container with-title">
        <h2 className="title">Game</h2>
        <div className="game-grid" style={this.calculateWidth()}>
          {grid.map((col, colIndex) => (
            <div className="game-grid__column">
              {col.map((row, rowIndex) => (
                <div className="game-grid__block">{this.renderBlock(colIndex, rowIndex)}</div>
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
};
