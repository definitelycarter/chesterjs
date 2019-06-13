import React from 'react';
import { storiesOf } from '@storybook/react';
import { SuiteRow } from './row';
import styles from './foo.module.scss';

storiesOf('suite/row', module)
  .add('passed', () => (
    <SuiteRow type="suite" status="passed">
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles['collapse-button']}>
            <i className="fal fa-caret-down" />
          </div>
          <div className={styles.title}>
            <span className={styles.label}>Hello, World</span>
          </div>
        </div>
        <div className={styles.duration}>
          <span className={styles.label}>8</span>
          <span className={`${styles.label} ${styles.unit}`}>ms</span>
        </div>
      </div>
    </SuiteRow>
  ))
  .add('failed', () => (
    <SuiteRow type="suite" status="failed">
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles['collapse-button']}>
            <i className="fal fa-caret-right" />
          </div>
          <div className={styles.title}>
            <span className={styles.label}>Hello, World</span>
          </div>
        </div>
        <div className={styles.duration}>
          <span className={styles.label}>25</span>
          <span className={`${styles.label} ${styles.unit}`}>sec</span>
        </div>
      </div>
    </SuiteRow>
  ));
