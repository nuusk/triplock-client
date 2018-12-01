/* eslint-disable no-console */
import React from 'react';

// import AppTitle from './components/AppTitle/AppTitle';
import './GlobalStyles.scss';

import Sockette from 'sockette';
import Game from './containers/Game';
import Buttons from './containers/Buttons';
import Console from './containers/Console';

const WEBSOCKET_URL = 'wss://chatapplication20181201011656.azurewebsites.net/game';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: {},
    };

    this.handleMessage = this.handleMessage.bind(this);

    this.socketClient = new Sockette(WEBSOCKET_URL, {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: () => {
        this.setState({ isConnected: true });
      },
      onmessage: e => this.handleMessage(e),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleMessage(e) {
    // console.log(e);

    try {
      // console.log(JSON.parse(JSON.parse(e.data).data.$value));

      // console.log(JSON.parse(e.data).data.$value);
      // const playerData = JSON.parse(JSON.parse(e.data).data.$value).currentPlayers.$values[0];
      const playerData = JSON.parse(JSON.parse(e.data).data.$value);
      playerData.data.forEach((turnData, index) => {
        const turnStatus = turnData.currentPlayers.$values[0];
        const status = {
          animation: turnStatus.animation,
          x: turnStatus.x,
          y: turnStatus.y,
        };
        // console.log(status);
        setTimeout(() => {
          this.setState({ status }, () => {
            console.log(this.state.status);
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

  render() {
    const { status, isConnected } = this.state;
    return (
      <div className="app">
        {/* <AppTitle /> */}
        {/* <Websocket
          url={WEBSOCKET_URL}
          onMessage={this.handleMessage}
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          ref={(Websocket) => {
            this.refWebSocket = Websocket;
          }}
        /> */}
        <Console />
        <Game status={status} />
        {/* <p className="balloon from-right">hello</p> */}
        {isConnected && <Buttons socketClient={this.socketClient} />}
      </div>
    );
  }
}
