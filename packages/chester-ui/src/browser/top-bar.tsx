import React from 'react';
import '../assets/css';
import styles from './top-bar.module.scss';

interface TopBarProps {
  projectName: string;
}
export function TopBar(props: TopBarProps) {
  return (
    <div className={styles.container}>
      <span className={styles['project-name']}>{props.projectName}</span>
      <input type="text" className={styles.filter} placeholder="Filter" />
    </div>
  );
}
