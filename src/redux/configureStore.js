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
import userManReducer from './forms/userManReducer';
import oneUserReducer from './forms/oneUserManReducer';

const rootReducer = combineReducers({
  user: userReducer,
  customer: customerReducer,
  oneCustomer: oneCustomerReducer,
  userManReducer,
  oneUser: oneUserReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(logger, thunk)));

export default store;
