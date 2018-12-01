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

    this.state = {};

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
    // console.log('onMessage: ');
    console.log(e);
    // const res = JSON.parse(e.data);
    // console.log(res);
    // console.log(typeof res.data.$value);
  }

  render() {
    const { isConnected } = this.state;
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
        <Game />
        {/* <p className="balloon from-right">hello</p> */}
        {isConnected && <Buttons socketClient={this.socketClient} />}
      </div>
    );
  }
}
