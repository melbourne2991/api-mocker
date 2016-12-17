import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import classnames from 'classnames';

export const PanelTypes = {
  TABLE: 'table'
};

export function PanelRow(props) {
  return (
    <div className={styles.panelRow}>{props.children}</div>
  );
}

export function PanelCol(props) {
  return (
    <div className={styles.panelCol}>{props.children}</div>
  );
}

export default class Panel extends Component {
  render() {
    const { title, children, type } = this.props;

    if(!title || !children) return null;

    const panelStyles = classnames(
      styles.panel, 
      styles[type]
    );

    return (
      <div className={panelStyles}>
        <div className={styles.header}>
          {title}
        </div>

        <div className={styles.body}>
          {children}
        </div>
      </div>
    );
  }
}

Panel.PropTypes = {
  header: React.PropTypes.string,
  children: React.PropTypes.component
};