export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        state: 'pending',
        suite: undefined,
        hasFailure: false,
      };
    case 'SUITE_UPDATED':
      return {
        ...state,
        suite: action.suite,
      };
    case 'TEST_FAILED':
      return { ...state, hasFailure: true };
    case 'END':
      let newState: State['state'] = state.hasFailure ? 'failed' : 'passed';
      return { ...state, state: newState };
    default:
      return state;
  }
}

type StartAction = { type: 'START' };
type EndAction = { type: 'END' };
type TestFailed = { type: 'TEST_FAILED' };
type SuiteUpdated = { type: 'SUITE_UPDATED'; suite: Suite };

export type Action = EndAction | StartAction | SuiteUpdated | TestFailed;

export type Suite = {
  title: string;
  root: boolean;
  tests: Test[];
  suites: Suite[];
};

export type Test = {
  title: string;
  duration: number | undefined;
  state: 'passed' | 'failed' | undefined;
};

export type State = {
  depth?: number;
  state?: 'pending' | 'failed' | 'passed';
  hasFailure?: boolean;
  suite?: Suite;
};
