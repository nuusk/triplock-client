import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonWrapper from '../components/ButtonWrapper/ButtonWrapper';

export default class Console extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.serverMethod = this.serverMethod.bind(this);
  }

  serverMethod(method) {
    const { socketClient } = this.props;

    const query = {
      messageType: 1,
      data: `{ methodName: '${method}', arguments: ['[-1, -1, -1]'] }`,
    };

    console.log(query);

    socketClient.send(JSON.stringify(query));
  }

  render() {
    return (
      <section className="Console container with-title">
        <h2 className="title">łukasz wypierdalaj</h2>
        <ButtonWrapper>
          <button
            onClick={() => {
              this.serverMethod('AddUser');
            }}
            type="button"
            className="btn is-primary"
          >
            Add User
          </button>
          <button
            onClick={() => {
              this.serverMethod('PlayerAction');
            }}
            type="button"
            className="btn is-warning"
          >
            Init Game
          </button>
          <button
            onClick={() => {
              this.serverMethod('ResetGameStatus');
            }}
            type="button"
            className="btn is-error"
          >
            Reset game
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
