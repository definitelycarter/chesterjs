export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return { ...state, status: 'started', suite: undefined };
    case 'SUITE_UPDATED':
      return {
        ...state,
        suite: action.suite,
      };
    case 'END':
      return { ...state, status: 'finished' };
    default:
      return state;
  }
}

// export function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case 'START':
//       return { ...state, status: 'started', depth: 0, root: undefined };
//     case 'END':
//       return { ...state, status: 'finished' };
//     case 'SUITE_START': {
//       if (state.depth) {
//         if (!state.root)
//           throw new Error(
//             'Error depth is greater than zero and root is undefined'
//           );
//         const cloned = state.root.suites.slice();
//         const suite = cloned.pop();

//         return {
//           ...state,
//           depth: state.depth! + 1,
//           root: {
//             ...state.root,
//             suites: [
//               ...cloned,
//               { ...suite!, suites: [...suite!.suites, action.suite] },
//             ],
//           },
//         };
//       }

//       return {
//         ...state,
//         depth: state.depth! + 1,
//         root: {
//           ...action.suite,
//         },
//       };
//     }
//     case 'SUITE_END':
//       return {
//         ...state,
//         depth: state.depth! - 1,
//       };
//     case 'TEST_START': {
//       if (!state.root)
//         throw new Error('Attempted to run a test on an uninitialized root');
//       const suite = state.root;

//       if (suite.suites.length) {
//         return {
//           ...state,
//           root: { ...suite, tests: [...suite.tests, action.test] },
//         };
//       }

//       const children = suite.suites.slice();
//       const child = children.pop()!;

//       return {
//         ...state,
//         root: {
//           ...suite,
//           suites: [
//             ...children,
//             {
//               ...child,
//               tests: [...child.tests, action.test],
//             },
//           ],
//         },
//       };
//     }
//     case 'TEST_UPDATE': {
//       let suite = state.root;
//       if (!suite) {
//         throw new Error('Attempted to pop a suite but it does not exist');
//       }

//       if (suite.suites.length) {
//         const children = suite.suites.slice();
//         const child = children.pop()!;

//         const tests = child.tests.slice();
//         const test = tests.pop();

//         return {
//           ...state,
//           root: {
//             ...suite,
//             suites: [
//               ...children,
//               {
//                 ...child,
//                 tests: [...tests, { ...test, ...action.test }],
//               },
//             ],
//           },
//         };
//       }
//       const tests = suite.tests.slice();
//       const test = tests.pop();
//       if (!test) {
//         throw new Error('Attempted to pop a test but it does not exist');
//       }
//       return {
//         ...state,
//         root: {
//           ...state.root,
//           tests: [...tests, { ...test, ...action.test }],
//         },
//       };
//     }
//   }
//   return state;
// }

type StartAction = { type: 'START' };
type EndAction = { type: 'END' };
type SuiteStart = { type: 'SUITE_START'; suite: Suite };
type SuiteEnd = { type: 'SUITE_END' };
type TestStart = { type: 'TEST_START'; test: Test };
type TestUpdate = { type: 'TEST_UPDATE'; test: Test };
type TestEnd = { type: 'TEST_END' };
type SuiteUpdated = { type: 'SUITE_UPDATED'; suite: Suite };

type Action =
  | StartAction
  | EndAction
  | SuiteUpdated
  | SuiteStart
  | SuiteEnd
  | TestStart
  | TestUpdate
  | TestEnd;

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
  status?: 'started' | 'finished';
  suite?: Suite;
};
