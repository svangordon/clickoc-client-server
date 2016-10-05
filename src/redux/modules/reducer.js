import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
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
  info,
  widgets,
  apiTest,
  legislator,
  tweet
});
