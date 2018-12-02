/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonWrapper from '../components/ButtonWrapper/ButtonWrapper';

import getCardColor from '../helpers/getCardColor';

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

  generateCard(cardNumber, cardIndex) {
    const { allCards } = this.props;
    const card = allCards[cardNumber];
    const cardName = card.name.split(',');

    return (
      <button
        type="button"
        onClick={() => {
          this.pickACard(cardNumber);
        }}
        className={`btn ${getCardColor(card.name)}`}
      >
        {cardName.map((cardNameChunk, index) => (
          <div key={index} className="card__name">
            {cardNameChunk}
          </div>
        ))}
        {card.dmg !== 0 && (
          <div className="card__kernel">
            {card.dmgKernel.map((kernelCol, index) => (
              <div key={index} className="kernel__col">
                {kernelCol.map((kernelBlock, innerIndex) => (
                  <div
                    key={innerIndex}
                    className={`kernel__block ${kernelBlock === true && 'kernel__block--target'}`}
                  >
                    {index === (card.dmgKernel.length - 1) / 2
                      && innerIndex === (kernelCol.length - 1) / 2 && <i className="icon close" />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
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
