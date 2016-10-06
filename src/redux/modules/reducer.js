import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import {reducer as form} from 'redux-form';
import apiTest from './apiTest';
import user from './user';
import legislator from './legislator';
import tweet from './tweet';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  user,
  form,
  apiTest,
  legislator,
  tweet
});
