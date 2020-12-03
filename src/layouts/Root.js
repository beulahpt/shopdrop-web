import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {IntlProvider} from 'react-intl';
import {renderRoutes} from 'react-router-config';

import AppContainer from './../containers/App';
const translations = require('./../config/translations.json');

export default class RootLayout extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <IntlProvider locale="en" messages={translations}>
          <ConnectedRouter history={this.props.history}>
            {renderRoutes([{component: AppContainer}])}
          </ConnectedRouter>
        </IntlProvider>
      </Provider>
    );
  }
}
