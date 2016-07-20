const TEST = 'redux-example/apiTest/TEST';
const TEST_SUCCESS = 'redux-example/apiTest/TEST_SUCCESS';
const TEST_FAILURE = 'redux-example/apiTest/TEST_FAILURE';

const initialState = {
  testing: false,
  testResult: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        testing: true
      };

    case TEST_SUCCESS:
      return {
        ...state,
        testing: false,
        testResult: 'pass'
      };

    case TEST_FAILURE:
      return {
        ...state,
        testing: false,
        testResult: 'fail'
      };

    default:
      return state;
  }
}

export function test() {
  return {
    types: [TEST, TEST_SUCCESS, TEST_FAILURE],
    promise: (client) => client.get('/test')
  };
}

// export function isLoaded(globalState) {
//   return globalState.info && globalState.info.loaded;
// }
//
// export function load() {
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: (client) => client.get('/loadInfo')
//   };
// }
