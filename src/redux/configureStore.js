import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import userReducer from './forms/userReducer';
import customerReducer from './forms/customerReducer';
/* eslint-disable */
import OneCustomerReducer from './forms/OneCustomerReducer';
/* eslint-enable */
import userManReducer from './forms/userManReducer';
import oneUserReducer from './forms/oneUserManReducer';
import itemReducer from './forms/getItemsReducer';
import seasonReducer from './forms/seasonReducer';

const rootReducer = combineReducers({
  user: userReducer,
  customer: customerReducer,
  // marketers,
  oneCustomer: OneCustomerReducer,
  userManReducer,
  oneUser: oneUserReducer,
  item: itemReducer,
  seasons: seasonReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(logger, thunk)));

export default store;
