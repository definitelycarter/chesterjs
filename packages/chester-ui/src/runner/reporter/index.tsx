import { Runner } from 'mocha';
import React, { useReducer } from 'react';
import { reducer, Suite, Test } from './reducer';
import styles from './reporter.module.scss';

export function Reporter() {
  const root = useReporter();
  return (
    <div className={styles.reporter}>
      {root && (
        <>
          {root.tests.map((test, t) => {
            return <TestRow key={t} test={test} />;
          })}
          {root.suites.map((suite, i) => {
            return <SuiteRow key={i} suite={suite} />;
          })}
        </>
      )}
    </div>
  );
}

interface SuiteRowProps {
  depth?: number;
  suite: Suite;
}
function SuiteRow({ depth = 0, suite }: SuiteRowProps) {
  return (
    <div className={styles.suite} style={{ marginLeft: depth * 15 }}>
      <i className="fal fa-chevron-down" />
      <span className={styles.title}>{suite.title}</span>
      {suite.tests.map((test, t) => {
        return <TestRow key={t} depth={depth + 1} test={test} />;
      })}
      {suite.suites.map((suite, i) => {
        return <SuiteRow key={i} depth={depth + 1} suite={suite} />;
      })}
    </div>
  );
}

interface TestRowProps {
  depth?: number;
  test: Test;
}
function TestRow({ depth = 0, test }: TestRowProps) {
  let className: string;

  switch (test.state) {
    case 'passed':
      className = `${styles.passed} fa-check-circle`;
      break;
    case 'failed':
      className = `${styles.failed} fa-times-circle`;
      break;
    default:
      className = `${styles.pending} fa-spin fa-spinner-third`;
  }

  return (
    <div className={styles.test} style={{ marginLeft: depth * 5 }}>
      <i className={`fal ${className}`} />
      <span className={styles.title}>{test.title}</span>
    </div>
  );
}

function useReporter() {
  const [state, dispatch] = useReducer(reducer, {
    suite: undefined,
  });
  if (typeof window === 'undefined') return state.suite;
  // @ts-ignore
  window.Reporter = function(runner: Runner) {
    runner.on('start', () => {
      dispatch({ type: 'START' });
    });

    runner.on('suite', suite => {
      dispatch({ type: 'SUITE_UPDATED', suite: hierarchy(root(runner.suite)) });
    });

    runner.on('test', test => {
      dispatch({ type: 'SUITE_UPDATED', suite: hierarchy(root(runner.suite)) });
    });

    runner.on('pass', test => {
      dispatch({ type: 'SUITE_UPDATED', suite: hierarchy(root(runner.suite)) });
    });

    runner.on('fail', test => {
      dispatch({ type: 'SUITE_UPDATED', suite: hierarchy(root(runner.suite)) });
    });

    runner.on('test end', test => {
      dispatch({ type: 'SUITE_UPDATED', suite: hierarchy(root(runner.suite)) });
    });

    runner.on('suite end', suite => {
      dispatch({ type: 'SUITE_UPDATED', suite: hierarchy(root(runner.suite)) });
    });

    runner.on('end', () => {
      dispatch({ type: 'END' });
    });
  };
  return state.suite;
}

function hierarchy({ tests, suites, title, root }: Mocha.Suite): Suite {
  return {
    title,
    root,
    suites: suites.map(hierarchy),
    tests: tests.map(({ title, duration, state }) => ({
      title,
      duration,
      state,
    })),
  };
}

function root(suite: Mocha.Suite): Mocha.Suite {
  if (suite.parent) return root(suite.parent);
  return suite;
}
