/* eslint-disable no-console */
import React from 'react';

// import AppTitle from './components/AppTitle/AppTitle';
import './GlobalStyles.scss';

import Sockette from 'sockette';
import Game from './containers/Game';
import Buttons from './containers/Buttons';
import Console from './containers/Console';

const WEBSOCKET_URL = 'wss://triplockedcommunication20181202025051.azurewebsites.net/game';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: {},
    };

    this.handleMessage = this.handleMessage.bind(this);
    this.handleOpen = this.handleOpen.bind(this);

    this.socketClient = new Sockette(WEBSOCKET_URL, {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: () => {
        this.handleOpen();
      },
      onmessage: e => this.handleMessage(e),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleMessage(e) {
    try {
      const playerData = JSON.parse(JSON.parse(e.data).data).data;
      playerData.forEach((turnData, index) => {
        const newGrid = turnData.grid;
        // const newStatus = {
        //   animation: turnStatus.animation,
        //   x: turnStatus.x,
        //   y: turnStatus.y,
        // };
        const newPlayers = turnData.currentPlayers;
        setTimeout(() => {
          this.setState({ players: newPlayers, grid: newGrid }, () => {
            // const { status } = this.state;
            const { grid } = this.state;
            console.log(grid);
          });
        }, 1000 * index);
      });
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  handleOpen() {
    this.setState({ isConnected: true });
  }

  render() {
    const { players, grid, isConnected } = this.state;
    return (
      <div className="app">
        {/* <AppTitle /> */}
        {isConnected && <Console socketClient={this.socketClient} />}
        <Game players={players} grid={grid} />
        {/* <p className="balloon from-right">hello</p> */}
        {isConnected && <Buttons socketClient={this.socketClient} />}
      </div>
    );
  }
}
