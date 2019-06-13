import React from 'react';
import '../assets/css';
import styles from './tool-bar.module.scss';

export function ToolBar() {
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <i className="fal fa-play" />
      </div>
      <div className={[styles.browser, styles.button].join(' ')}>
        <span className={styles.label}>Chrome</span>
      </div>
    </div>
  );
}
