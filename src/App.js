import React from 'react';
import Websocket from 'react-websocket';
// import AppTitle from './components/AppTitle/AppTitle';

import './GlobalStyles.scss';
import Game from './containers/Game';
import Buttons from './containers/Buttons';
import Console from './containers/Console';

const WEBSOCKET_URL = 'wss://chatapplication20181201011656.azurewebsites.net/chat';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleMessage = this.handleMessage.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleMessage(data) {
    console.log(`onMessage: ${data}`);
    console.log(process.env.REACT_APP_MESSAGE_TYPE_TEXT);
    const { count } = this.state;
    const result = JSON.parse(data);
    this.setState({ count: count + result.movement });
  }

  handleOpen(data) {
    console.log(`onOpen: ${data}`);
  }

  render() {
    return (
      <div className="app">
        {/* <AppTitle /> */}
        <Websocket url={WEBSOCKET_URL} onMessage={this.handleMessage} onOpen={this.handleOpen} />
        <Console />
        <Game />
        {/* <p className="balloon from-right">hello</p> */}
        <Buttons />
      </div>
    );
  }
}
