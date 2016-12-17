import React, { Component } from 'react';
import styles from './styles.css';
import Stub from './Stub';
import Logger from './Logger';

class App extends Component {
  constructor(props) {
    super(props);
  }

  renderStubs() {
    const { stubs } = this.props.data;

    const mapped = stubs.map((stub, i) => {
      return (
        <Stub key={i} stub={stub}/>
      )
    });

    return mapped;
  }

  render() {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <h1>API Stubs</h1>
        </header>

        <section className={styles.stubs}>
          {this.renderStubs()}
        </section>

        <header className={styles.header}>
          <h1>Logs</h1>
        </header>

        <Logger/>
      </div>

    )
  }
}

export default App;