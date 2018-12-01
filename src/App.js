import React from 'react';
// import Websocket from 'react-websocket';
// import AppTitle from './components/AppTitle/AppTitle';

import './GlobalStyles.scss';

import Sockette from 'sockette';
import Game from './containers/Game';
import Buttons from './containers/Buttons';
import Console from './containers/Console';

const WEBSOCKET_URL = 'wss://chatapplication20181201011656.azurewebsites.net/game';

// ws.send('Hello, world!');
// ws.json({ type: 'ping' });
// ws.close(); // graceful shutdown

// Reconnect 10s later
// setTimeout(ws.reconnect, 10e3);

// const testData = {
//   messageType: 1,
//   data: {
//     methodName: 'PlayerAction',
//     arguments: ['[1,2,3]'],
//   },
// };

// ws.send('Hello, world!');
// ws.json({ type: 'ping' });
// ws.json(testData);
// ws.close(); // graceful shutdown

const testData = {
  messageType: 1,
  data: {
    methodName: 'PlayerAction',
    arguments: ['[1,2,3]'],
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleMessage = this.handleMessage.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.ws = new Sockette(WEBSOCKET_URL, {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: e => this.handleOpen(),
      onmessage: e => console.log('Received:', e),
      // onreconnect: e => console.log('Reconnecting...', e),
      // onmaximum: e => console.log('Stop Attempting!', e),
      // onclose: e => console.log('Closed!', e),
      // onerror: e => console.log('Error:', e),
    });
  }

  componentDidMount() {}

  // eslint-disable-next-line class-methods-use-this
  handleReconnect(data) {
    // eslint-disable-next-line no-console
    console.log('Reconnecting...', data);
  }

  handleClose(data) {
    console.log('Closing...', data);
  }

  // eslint-disable-next-line class-methods-use-this
  handleMessage(data) {
    console.log('onMessage: ');
    const res = JSON.parse(data);
    if (res.messageType == 2) {
      this.refWebSocket.sendMessage(testData);
    }
  }

  handleOpen() {
    this.setState({
      isConnected: true,
    });
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
        {isConnected && <Buttons ws={this.ws} />}
      </div>
    );
  }
}
