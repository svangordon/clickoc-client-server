const LOAD = 'clickoc-client/user/LOAD';
const LOAD_SUCCESS = 'click-client/user/LOAD_SUCCESS';
const LOAD_FAIL = 'click-client/user/LOAD_FAIL';
const SET_LOCATION = 'clickoc-client/user/SET_LOCATION';
const SET_LOCATION_SUCCESS = 'click-client/user/SET_LOCATION_SUCCESS';
const SET_LOCATION_FAIL = 'click-client/user/SET_LOCATION_FAIL';

const initialState = {
  loaded: false,
  user: null
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
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SET_LOCATION:
      return {
        ...state,
        loading: true
      };
    case SET_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case SET_LOCATION_FAIL:
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
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/user')
  };
}

export function setLocation(location) {
  return {
    types: [SET_LOCATION, SET_LOCATION_SUCCESS, SET_LOCATION_FAIL],
    promise: (client) => client.post('/api/user', { data: location })
  };
}
