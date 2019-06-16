import React from 'react';
import '../assets/css';
import { StatusIcon, StatusIconProps } from '../icons/status-icon';
import styles from './row.module.scss';

interface StatusRowProps extends ToggleButtonProps {
  name: string;
  depth?: number;
  status?: StatusIconProps['status'];
  duration: { interval: number; unit: string };
}
export function SuiteRow({ depth = 1, ...rest }: StatusRowProps) {
  return (
    <div className={styles.container}>
      {Boolean(rest.status) && <StatusIcon type="suite" status={rest.status} />}
      <div className={styles.content}>
        <div
          className={styles.wrapper}
          style={{ paddingLeft: (depth - 1) * 32 }}
        >
          <div className={styles.title}>
            <ToggleButton onToggle={rest.onToggle} open={rest.open} />
            <div className={styles.title}>
              <span className={[styles.label, styles.medium].join(' ')}>
                {rest.name}
              </span>
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

interface ToggleButtonProps {
  open?: boolean;
  onToggle?: () => void;
}
function ToggleButton(props: ToggleButtonProps) {
  const classes = ['fal'];
  if (props.open) {
    classes.push('fa-caret-down');
  } else {
    classes.push('fa-caret-right');
  }
  return (
    <div className={styles['collapse-button']} onClick={props.onToggle}>
      <i className={classes.join(' ')} />
    </div>
  );
}
