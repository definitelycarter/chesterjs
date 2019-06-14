import React from 'react';
import '../assets/css';
import { StatusIcon } from '../icons/status-icon';
import styles from './row.module.scss';

interface StatusRowProps {
  name: string;
  depth?: number;
  status: 'passed' | 'failed' | 'pending';
  duration: { interval: number; unit: string };
}
export function TestRow({ depth = 1, ...rest }: StatusRowProps) {
  return (
    <div className={styles.container}>
      <StatusIcon type="test" status={rest.status} />
      <div className={styles.content}>
        <div className={styles.wrapper} style={{ paddingLeft: depth * 32 }}>
          <div className={styles.title}>
            <span className={styles.label}>{rest.name}</span>
          </div>
          <div className={styles.duration}>
            <span className={styles.label}>{rest.duration.interval}</span>
            <span className={`${styles.label} ${styles.unit}`}>
              {rest.duration.unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
