import React from 'react';
import '../assets/css';
import { StatusIcon } from '../icons/status-icon';
import styles from './row.module.scss';

interface StatusRowProps {
  status: 'passed' | 'failed' | 'pending';
}
export function SuiteRow(props: StatusRowProps) {
  return (
    <div className={styles.container}>
      <StatusIcon type="suite" status={props.status} />
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <span className={styles.label}>Hello, World</span>
          </div>
          <div className={styles.duration}>
            <span className={styles.label}>8</span>
            <span className={`${styles.label} ${styles.unit}`}>ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
