/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonWrapper from '../components/ButtonWrapper/ButtonWrapper';

export default class Buttons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextRound: [],
      currentTurn: 0,
    };

    this.generateCard = this.generateCard.bind(this);
    this.pickACard = this.pickACard.bind(this);
  }

  generateCard(card, cardIndex) {
    const { allCards } = this.props;

    console.log(allCards);
    console.log(allCards[card]);
    return (
      <button
        type="button"
        onClick={() => {
          this.pickACard(cardIndex);
        }}
        className="btn is-primary"
      >
        {allCards[card].name}
      </button>
    );
  }

  pickACard(cardIndex) {
    const { nextRound, currentTurn } = this.state;
    const { socketClient } = this.props;
    const cardId = 0 + cardIndex;

    const newNextRound = [...nextRound, cardId];
    const newCurrentTurn = currentTurn + 1;

    this.setState(
      {
        nextRound: newNextRound,
        currentTurn: newCurrentTurn,
      },
      () => {
        if (currentTurn >= 2) {
          // console.log(this.state.nextRound);
          const query = {
            messageType: 1,
            data: `{ methodName: 'PlayerAction', arguments: [' [${this.state.nextRound.map(
              turn => turn,
            )}] '] }`,
          };

          // console.log(query);

          socketClient.send(JSON.stringify(query));
        }
      },
    );
  }

  render() {
    const { cards, allCards } = this.props;

    return (
      <section className="buttons container with-title">
        <h2 className="title">Buttons</h2>
        <ButtonWrapper>
          {cards && cards.map((card, index) => this.generateCard(card, index))}
          {/* <button type="button" className="btn">
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
          </button> */}
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
  // cardList: PropTypes.arrayOf(PropTypes.shape({

  // }))
};
