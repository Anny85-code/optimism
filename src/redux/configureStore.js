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
import oneSeasonReducer from './forms/oneSeasonReducer';
import OneTransactionReducer from './forms/OneTransactionReducer';
import transactionReducer from './forms/transactionReducer';
import oneItemReducer from './forms/oneItemReducer';
import errorReducer from './forms/errors';

const rootReducer = combineReducers({
  user: userReducer,
  customer: customerReducer,
  oneCustomer: OneCustomerReducer,
  userManReducer,
  oneUser: oneUserReducer,
  item: itemReducer,
  oneItem: oneItemReducer,
  seasons: seasonReducer,
  oneSeason: oneSeasonReducer,
  oneTransaction: OneTransactionReducer,
  transactions: transactionReducer,
  errors: errorReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(logger, thunk)));

export default store;
