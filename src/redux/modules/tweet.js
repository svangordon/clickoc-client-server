const IS_VALID = 'clickoc-client/tweet/IS_VALID';
const IS_VALID_SUCCESS = 'clickoc-client/tweet/IS_VALID_SUCCESS';
const IS_VALID_FAIL = 'clickoc-client/tweet/IS_VALID_FAIL';
const SEND_TWEET = 'clickoc-client/tweet/SEND_TWEET';
const SEND_TWEET_SUCCESS = 'clickoc-client/tweet/SEND_TWEET_SUCCESS';
const SEND_TWEET_FAIL = 'clickoc-client/tweet/SEND_TWEET_FAIL';
const TOGGLE_LEGISLATOR = 'clickoc-client/tweet/ACTIVATE_LEGISLATOR';

const initialState = {
  saveError: null,
  activeLegislators: [], // active in the sense of we want to tweet them
  initialized: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case IS_VALID:
      return state; // 'saving' flag handled by redux-form
    case IS_VALID_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: data,
        saveError: null,
      };
    case IS_VALID_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: action.error
      } : state;
    case SEND_TWEET:
      return {
        ...state,
        sending: true
      };
    case SEND_TWEET_SUCCESS:
      return {
        ...state,
        sending: false,
        sent: true,
        sentTweet: action.result
      };
    case SEND_TWEET_FAIL:
      return {
        ...state,
        sending: false,
        sent: false,
        error: action.error
      };
    case TOGGLE_LEGISLATOR:
      const {activeLegislators} = state;
      console.log('trying to add legislator, action ==', action);
      if (!activeLegislators.includes(action.legislator)) {
        activeLegislators.push(action.legislator);
      } else {
        activeLegislators.splice(activeLegislators.indexOf(action.legislator), 1);
      }
      return {
        ...state,
        activeLegislators: activeLegislators,
        initialized: true
      };
    default:
      return state;
  }
}

export function isValidTweet(data) {
  return {
    types: [IS_VALID, IS_VALID_SUCCESS, IS_VALID_FAIL],
    promise: (client) => client.post('/api/tweet', {
      data
    })
  };
}

export function sendTweet(data) {
  return {
    types: [SEND_TWEET, SEND_TWEET_SUCCESS, SEND_TWEET_FAIL],
    promise: (client) => client.post('/api/tweet', {
      data
    })
  };
}

export function toggleLegislator(legislator) {
  return {
    type: TOGGLE_LEGISLATOR,
    legislator
  };
}
