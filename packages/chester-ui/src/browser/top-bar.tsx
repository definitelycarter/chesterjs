import React from 'react';
import '../assets/css';
import styles from './top-bar.module.scss';

export function TopBar() {
  return (
    <div className={styles.container}>
      <span className={styles['project-name']}>Hello, World</span>
      <input type="text" className={styles.filter} placeholder="Filter" />
    </div>
  );
}
