import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {renderRoutes} from 'react-router-config';

export default class ParentLayout extends PureComponent {
  static propTypes = {
    route: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  render() {
    const {route} = this.props;
    return (
      <div>
        <h3>
          Parent Layout
        </h3>
        {renderRoutes(route.routes)}
      </div>
    );
  }
}
