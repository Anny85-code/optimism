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
import oneCustomerReducer from './forms/oneCustomerReducer';
/* eslint-enable */
import userManReducer from './forms/userManReducer';
import oneUserReducer from './forms/oneUserManReducer';
import itemReducer from './forms/getItemsReducer';


const rootReducer = combineReducers({
  user: userReducer,
  customer: customerReducer,
  marketers,
  oneCustomer: oneCustomerReducer,
  userManReducer,
  oneUser: oneUserReducer,
  item: itemReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(logger, thunk)));

export default store;
