import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import {routerReducer, routerMiddleware} from 'react-router-redux';
import * as reducers from './reducers';

/**
 * Configure Application Single store
 * This includes History (Push State) support
 * @param history Object
 */
export function configureStore(history) {
  // Setup default Middleware
  let middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // Standar Redux Composer
  let composer = compose;

  // Add Redux Logger only to development
  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
    middleware.push(require('redux-immutable-state-invariant').default());
    // Redux Dev Composer
    composer = require('redux-devtools-extension').composeWithDevTools;
  }

  const store = createStore(
    combineReducers({...reducers, routing: routerReducer}),
    composer(applyMiddleware(...middleware))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  // Create application store
  return store;
}
