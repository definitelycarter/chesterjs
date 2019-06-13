import React from 'react';
import '../assets/css';
import styles from './browser.module.scss';
import { TopBar } from './top-bar';
import { ToolBar } from './tool-bar';

export function Browser() {
  return (
    <div className={styles.container}>
      <TopBar />
      <ToolBar />
      <div className={styles.list}>hi</div>
    </div>
  );
}
