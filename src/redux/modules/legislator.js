const LOAD = 'clickoc-client/legislator/LOAD';
const LOAD_SUCCESS = 'clickoc-client/legislator/LOAD_SUCCESS';
const LOAD_FAIL = 'clickoc-client/legislator/LOAD_FAIL';

const initialState = {
  loaded: false,
  legislator: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        legislator: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/legislator')
  };
}
