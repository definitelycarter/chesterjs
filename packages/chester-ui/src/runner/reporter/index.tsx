import { Runner } from 'mocha';
import React, { useReducer, Dispatch, useEffect, useRef } from 'react';
import { reducer, Suite, Test, Action } from './reducer';
import '../../colors.css';
import styles from './reporter.module.scss';

export function Reporter() {
  const { suite } = useReporter();
  return (
    <div className={styles.reporter}>
      {suite && (
        <>
          {suite.tests.map((test, t) => {
            return <TestRow key={t} test={test} />;
          })}
          {suite.suites.map((suite, i) => {
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
  const state = getSuiteState(suite);
  return (
    <>
      <div className={`${styles.suite} ${styles[state]}`}>
        <span style={{ marginLeft: depth * 10 }} className={styles.title}>
          {suite.title}
        </span>
      </div>
      {suite.tests.map((test, t) => {
        return <TestRow key={t} depth={depth + 1} test={test} />;
      })}
      {suite.suites.map((suite, i) => {
        return <SuiteRow key={i} depth={depth + 1} suite={suite} />;
      })}
    </>
  );
}

function getSuiteState(suite: Suite): 'pending' | 'passed' | 'failed' {
  let state: 'pending' | 'passed' | 'failed' = 'pending';
  if (suite.suites.length) {
    if (suite.suites.every(s => getSuiteState(s) === 'passed')) {
      state = 'passed';
    } else if (suite.suites.some(s => getSuiteState(s) === 'failed')) {
      state = 'failed';
    } else {
      state = 'pending';
    }
  }
  if (state === 'failed') return state;

  if (suite.tests.every(t => t.state === 'passed')) return 'passed';
  else if (suite.tests.some(t => t.state === 'failed')) return 'failed';

  return 'pending';
}

interface TestRowProps {
  depth?: number;
  test: Test;
}
function TestRow({ depth = 0, test }: TestRowProps) {
  let className: string;
  const state = test.state === undefined ? 'pending' : test.state;
  className = `${styles.title} ${styles.test} ${styles[state]}`;
  return (
    <div className={className}>
      <div style={{ marginLeft: depth * 10 }} className={styles.title}>
        {test.title}
      </div>
    </div>
  );
}

function useReporter() {
  const [state, dispatch] = useReducer(reducer, {
    suite: undefined,
  });
  const reporterRef = useRef(createDispatchReporter(dispatch));
  if (typeof window === 'undefined') return state;

  useEffect(() => {
    const iframe = document.getElementById('env') as HTMLIFrameElement | null;
    if (!iframe) {
      throw new Error('Unable to get iframe');
    }
    const window = iframe.contentWindow!;
    window.addEventListener('DOMContentLoaded', () => {
      // @ts-ignore
      const mocha = window.mocha as {
        run: () => void;
        reporter: (reporter: any) => void;
      };
      mocha.reporter(reporterRef.current);
      mocha.run();
    });
  }, []);

  return state;
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

const createDispatchReporter = (dispatch: Dispatch<Action>) => (
  runner: Runner
) => {
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
    dispatch({ type: 'TEST_FAILED' });
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
