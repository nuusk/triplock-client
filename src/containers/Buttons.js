import React, { Component } from 'react';

import './Buttons.scss';

const testData = {
  messageType: 1,
  data: {
    methodName: 'PlayerAction',
    arguments: ['[1,2,3]'],
  },
};

export default class Buttons extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { ws } = this.props;

    // ws.json(testData);
  }

  render() {
    return (
      <section className="buttons container with-title">
        <h2 className="title">Buttons</h2>
        <div className="buttons__wrapper">
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
        </div>
      </section>
    );
  }
}
