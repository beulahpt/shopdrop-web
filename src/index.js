import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';

import './polyfills';

import {configureStore} from './store';
import RootContainer from './layouts/Root';

const history = createHistory();
const store = configureStore(history);
const rootEl = document.getElementById('root');

// If Production Mode, No need for hot-reload or perf
if (process.env.NODE_ENV === 'production') {
  ReactDOM.render(<RootContainer store={store} history={history} />, rootEl);
} else {
  // Hot Reload Patch Support
  require('react-hot-loader/patch');
  // Create AppContainer around RootContainer for Hot Reload Support
  const renderWithHotReload = (HotRootContainer) => {
    const AppContainer = require('react-hot-loader').AppContainer;
    ReactDOM.render(
      <AppContainer>
        <HotRootContainer store={store} history={history} />
      </AppContainer>,
      rootEl
    );
  };

  //Initial Render with HotReload
  renderWithHotReload(RootContainer);

  if (module.hot) {
    module.hot.accept(RootContainer, () => {
      console.log("Applying Hot Update!");
      const nextRootContainer = require(RootContainer).default;
      renderWithHotReload(nextRootContainer);
    });
  }
}
