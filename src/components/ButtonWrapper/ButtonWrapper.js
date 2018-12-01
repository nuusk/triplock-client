import React from 'react';
import PropTypes from 'prop-types';

import './ButtonWrapper.scss';

const ButtonWrapper = ({ children }) => <div className="button-wrapper">{children}</div>;

ButtonWrapper.propTypes = {
  children: PropTypes.instanceOf('<button></button>').isRequired,
};

export default ButtonWrapper;
