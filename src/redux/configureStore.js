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

const rootReducer = combineReducers({
  user: userReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(logger, thunk)));

export default store;
