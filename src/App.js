import React from 'react';
import AppTitle from './components/AppTitle/AppTitle';

import './GlobalStyles.scss';
import Game from './containers/Game';
import Buttons from './containers/Buttons';
import Console from './containers/Console';

export default function App() {
  return (
    <div className="app">
      {/* <AppTitle /> */}
      <Console />
      <Game />
      <Buttons />
    </div>
  );
}
