import React, { ReactChild } from 'react';
import styles from './row.module.scss';
import { StatusIcon } from '../icons/status-icon';
import '../assets/fonts/light.min.css';
import '../assets/fonts/fontawesome.min.css';
interface StatusRowProps {
  type: 'suite' | 'test';
  status: 'passed' | 'failed' | 'pending';
  children: ReactChild | ReactChild[];
}
export function SuiteRow(props: StatusRowProps) {
  return (
    <div className={styles.container}>
      <StatusIcon type={props.type} status={props.status} />
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
