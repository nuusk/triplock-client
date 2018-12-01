import React from 'react';
import PropTypes from 'prop-types';

const GameScreen = ({ children, ...rest }) => <div className="game-screen">{children}</div>;

GameScreen.defaultProps = {
  columns: 10,
  rows: 10,
  spanned: false,
  narrow: false,
  distributed: false,
  light: false,
};

GameScreen.propTypes = {
  columns: PropTypes.number,
  rows: PropTypes.number,
  spanned: PropTypes.bool,
  narrow: PropTypes.bool,
  distributed: PropTypes.bool,
  light: PropTypes.bool,
};

export default GameScreen;
