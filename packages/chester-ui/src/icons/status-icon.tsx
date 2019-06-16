import React from 'react';
import '../assets/css';
import styles from './status-icon.module.scss';

export interface StatusIconProps {
  height?: number;
  type: 'suite' | 'test';
  status?: 'failed' | 'passed' | 'pending' | undefined;
}
export function StatusIcon({
  status = 'pending',
  type,
  height = 30,
}: StatusIconProps) {
  const classes = [styles[type], styles[status], styles.container];
  return <div className={classes.join(' ')} style={{ height: height }} />;
}
