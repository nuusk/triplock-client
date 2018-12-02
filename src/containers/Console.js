import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
      waitedLongEnough: false,
    };

    // console.log(query);

    socketClient.send(JSON.stringify(query));
  }

  render() {
    return (
      <section className="Console container with-title">
        <h2 className="title">Konsola</h2>
        <ButtonWrapper>
          <button
            onClick={() => {
              this.serverMethod('AddUser');
              setTimeout(() => {
                this.setState({
                  waitedLongEnough: true,
                });
              }, 5000);
            }}
            type="button"
            className="btn is-primary"
          >
            NACIŚNIJ I CZEKAJ PLZ
          </button>
          {this.state.waitedLongEnough && (
            <button
              onClick={() => {
                this.serverMethod('PlayerAction');
              }}
              type="button"
              className="btn is-warning"
            >
              Na mój znak klikaj tu.
            </button>
          )}

          <button
            onClick={() => {
              this.serverMethod('ResetGameStatus');
              alert('OSZUKISTA!');
            }}
            type="button"
            className="btn is-error"
          >
            TU NIE KLIKAJ XD
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
