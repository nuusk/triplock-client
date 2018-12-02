/* eslint-disable no-console */
import React from 'react';

// import AppTitle from './components/AppTitle/AppTitle';
import './GlobalStyles.scss';

import Sockette from 'sockette';
import ReactHowler from 'react-howler';
import Game from './containers/Game';
import Buttons from './containers/Buttons';
import Console from './containers/Console';
import ButtonWrapper from './components/ButtonWrapper/ButtonWrapper';

const WEBSOCKET_URL = 'wss://triplockedcommunication20181202025051.azurewebsites.net/game';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserAdded: false,
      cards: [],
    };

    this.handleMessage = this.handleMessage.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.initGame = this.initGame.bind(this);

    this.socketClient = new Sockette(WEBSOCKET_URL, {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: (e) => {
        this.handleOpen(e);
      },
      onmessage: e => this.handleMessage(e),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleMessage(e) {
    const { isUserAdded } = this.state;
    if (!isUserAdded) {
      try {
        this.setState({
          userId: JSON.parse(e.data).data,
          isUserAdded: true,
        });
      } catch (err) {}
    }
    try {
      const { userId } = this.state;
      const playerData = JSON.parse(JSON.parse(e.data).data).data;
      console.log(playerData);
      playerData.forEach((turnData, index) => {
        const newGrid = turnData.grid;
        const newPlayers = turnData.currentPlayers;
        const cardList = turnData.cardsList;
        // console.log(turnData);
        // console.log(turnData.cardList);
        newPlayers.forEach((newPlayer) => {
          if (newPlayer.playerId === userId) {
            this.setState({
              cards: newPlayer.currentHand,
              playerId: userId,
            });
          }
        });
        setTimeout(() => {
          this.setState({ players: newPlayers, grid: newGrid, cardList }, () => {
            const { players } = this.state;
            if (players) {
              this.initGame();
            }
          });
        }, 1000 * index);
      });
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  handleOpen(e) {
    // console.log(e);
    this.setState({ isConnected: true });
  }

  initGame() {
    this.setState({ isGameStarted: true });
  }

  render() {
    const {
      players, cards, grid, isConnected, isGameStarted, cardList, playerId,
    } = this.state;
    return (
      <div className="app">
        <ReactHowler src="/assets/soundtrack/BeepBox-Song.wav" playing volume={0.2} />
        {/* <AppTitle /> */}
        {isConnected && <Console initGame={this.initGame} socketClient={this.socketClient} />}
        {isGameStarted && <Game players={players} grid={grid} />}
        {/* <p className="balloon from-right">hello</p> */}
        {isGameStarted && (
          <Buttons
            playerName={playerId}
            cards={cards}
            allCards={cardList}
            socketClient={this.socketClient}
          />
        )}
      </div>
    );
  }
}
