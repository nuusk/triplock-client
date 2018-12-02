import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonWrapper from '../components/ButtonWrapper/ButtonWrapper';

const testData = {
  messageType: 1,
  data: "{ methodName: 'PlayerAction', arguments: ['[3,3,3]'] }",
};

const iAmController = {
  messageType: 1,
  data: "{ methodName: 'AddUser', arguments: ['[0, 0, 0]'] }",
};

export default class Console extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { socketClient } = this.props;
    return (
      <section className="Console container with-title">
        <h2 className="title">Console</h2>
        <ButtonWrapper>
          <button
            onClick={() => {
              socketClient.send(JSON.stringify(iAmController));
            }}
            type="button"
            className="btn is-primary"
          >
            Add User
          </button>
          <button
            onClick={() => {
              socketClient.send(JSON.stringify(testData));
            }}
            type="button"
            className="btn"
          >
            Mock data
          </button>
        </ButtonWrapper>
      </section>
    );
  }
}

Console.propTypes = {
  socketClient: PropTypes.shape({
    close: PropTypes.func.isRequired,
    json: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    reconnect: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
  }).isRequired,
};
