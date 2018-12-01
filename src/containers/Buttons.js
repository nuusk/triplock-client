import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonWrapper from '../components/ButtonWrapper/ButtonWrapper';

const testData = {
  messageType: 1,
  data: "{ methodName: 'PlayerAction', arguments: ['[4,4,4]'] }",
};

export default class Buttons extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { socketClient } = this.props;

    // socketClient.send(JSON.stringify(testData));
  }

  render() {
    return (
      <section className="buttons container with-title">
        <h2 className="title">Buttons</h2>
        <ButtonWrapper>
          <button type="button" className="btn is-primary">
            Primary
          </button>
          <button type="button" className="btn">
            Idź w prawo
          </button>
          <button type="button" className="btn is-primary">
            Idź w lewo
          </button>
          <button type="button" className="btn is-success">
            Idź w górę
          </button>
          <button type="button" className="btn is-warning">
            Idź w dół
          </button>
          <button type="button" className="btn is-error">
            Atakuj
          </button>
        </ButtonWrapper>
      </section>
    );
  }
}

Buttons.propTypes = {
  socketClient: PropTypes.shape({
    close: PropTypes.func.isRequired,
    json: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    reconnect: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
  }).isRequired,
};
