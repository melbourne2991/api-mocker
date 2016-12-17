import React, { Component } from 'react';
import styles from './styles.css';
import classnames from 'classnames';

import Panel, { 
  PanelTypes, 
  PanelRow, 
  PanelCol 
} from '../common/Panel';

export default class Stub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  toggleStub() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  renderHeaders(obj) {
    const { headers } = obj;

    if(!headers) return null;

    const arr = [];
    let len = 0;

    for (let header in headers) {
      if(headers.hasOwnProperty(header)) {
        len = arr.push(
          <PanelRow key={len}>
            <PanelCol>
              {header}
            </PanelCol>

            <PanelCol>
              {headers[header]}
            </PanelCol>
          </PanelRow>
        )
      }
    }

    return arr;
  }

  render() {
    const { request, response } = this.props.stub;

    const methodStyles = classnames(
      styles.method, 
      styles[request.method.toLowerCase()]
    );

    const stubStyles = classnames(
      styles.stub,
      {
        [styles.expanded]: this.state.expanded
      }
    )

    return (
      <div className={stubStyles}>
        <div className={styles.header} onClick={this.toggleStub.bind(this)}>
          <div className={methodStyles}>
            {request.method}
          </div>

          <div className={styles.url}>
            {request.url}
          </div>

          <div className={styles.arrow}></div>
        </div>

        <div className={styles.body}>
          <h2 className={styles.heading}>Request</h2>

          <Panel title={'METHOD'}>
            {request.method}
          </Panel>

          <Panel title={'URL'}>
            {request.url}
          </Panel>

          <Panel title={'HEADERS'} type={PanelTypes.TABLE}>
            {this.renderHeaders(request)}
          </Panel>

          <h2 className={styles.heading}>Response</h2>

          <Panel title={'STATUS'}>
            {response.status}
          </Panel>

          <Panel title={'BODY'}>
            <pre>
            {JSON.stringify(response.body, null, 4)}
            </pre>
          </Panel>

          <Panel title={'HEADERS'} type={PanelTypes.TABLE}>
            {this.renderHeaders(response)}
          </Panel>
        </div>
      </div>
    )
  }
}