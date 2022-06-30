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
import oneCustomerReducer from './forms/oneCustomerReducer';

const rootReducer = combineReducers({
  user: userReducer,
  customer: customerReducer,
  oneCustomer: oneCustomerReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(logger, thunk)));

export default store;
