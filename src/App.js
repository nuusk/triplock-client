import React from 'react';
import Websocket from 'react-websocket';
// import AppTitle from './components/AppTitle/AppTitle';

import './GlobalStyles.scss';

import Game from './containers/Game';
import Buttons from './containers/Buttons';
import Console from './containers/Console';

const WEBSOCKET_URL = 'wss://chatapplication20181201011656.azurewebsites.net/game';

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

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleMessage = this.handleMessage.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentDidMount() {}

  // eslint-disable-next-line class-methods-use-this
  handleReconnect(data) {
    // eslint-disable-next-line no-console
    console.log('Reconnecting...', data);
  }

  // eslint-disable-next-line class-methods-use-this
  handleMessage(data) {
    console.log('onMessage: ');
    console.log(data);
    // const { count } = this.state;
    // const result = JSON.parse(data);
    // this.setState({ count: count + result.movement });
  }

  handleOpen() {
    // this.setState({
    //   isConnected: true,
    // });
  }

  render() {
    const { isConnected } = this.state;
    return (
      <div className="app">
        {/* <AppTitle /> */}
        <Websocket url={WEBSOCKET_URL} onMessage={this.handleMessage} onOpen={this.handleOpen} />
        <Console />
        <Game />
        {/* <p className="balloon from-right">hello</p> */}
        {/* {isConnected && <Buttons ws={this.ws} />} */}
      </div>
    );
  }
}
