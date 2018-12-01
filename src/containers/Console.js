import React, { Component } from 'react';

import './Console.scss';

export default class Console extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section className="console container with-title">
        <h2 className="title">Console</h2>
        <img src="/mockup-console.png" alt="" />
      </section>
    );
  }
}
