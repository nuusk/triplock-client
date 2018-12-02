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
    console.log(e);
    try {
      // console.log(JSON.parse(JSON.parse(e.data).data.$value));

      // console.log(JSON.parse(e.data));
      // const playerData = JSON.parse(JSON.parse(e.data).data.$value).currentPlayers.$values[0];
      const playerData = JSON.parse(JSON.parse(e.data).data).data;
      console.log(playerData);
      playerData.forEach((turnData, index) => {
        // console.log(index);
        // console.log(turnData);
        const turnStatus = turnData.currentPlayers[0];
        const newGrid = turnData.grid;
        const newStatus = {
          animation: turnStatus.animation,
          x: turnStatus.x,
          y: turnStatus.y,
        };
        setTimeout(() => {
          this.setState({ status: newStatus }, () => {
            const { status } = this.state;
            console.log(status);
          });
        }, 1000 * index);
      });
      const playerStatus = {
        x: playerData.x,
        y: playerData.y,
        animation: playerData.animation,
      };

      this.setState({
        status: playerStatus,
      });

      // console.log(playerStatus);
    } catch (err) {
      console.log('Cannot read that shit!');
    }
    // console.log(typeof res.data.$value);
  }

  handleOpen() {
    this.setState({ isConnected: true });
  }

  render() {
    const { status, isConnected } = this.state;
    return (
      <div className="app">
        {/* <AppTitle /> */}
        {isConnected && <Console socketClient={this.socketClient} />}
        <Game status={status} />
        {/* <p className="balloon from-right">hello</p> */}
        {isConnected && <Buttons socketClient={this.socketClient} />}
      </div>
    );
  }
}
