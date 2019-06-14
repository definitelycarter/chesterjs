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
export function SuiteRow({ depth = 1, ...rest }: StatusRowProps) {
  return (
    <div className={styles.container}>
      <StatusIcon type="suite" status={rest.status} />
      <div className={styles.content}>
        <div
          className={styles.wrapper}
          style={{ paddingLeft: (depth - 1) * 32 }}
        >
          <div className={styles.title}>
            <div className={styles['collapse-button']}>
              <i className="fal fa-caret-right" />
            </div>
            <div className={styles.title}>
              <span className={styles.label}>{rest.name}</span>
            </div>
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
