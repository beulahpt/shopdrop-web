import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class Placeholder extends PureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired
  };

  render() {
    return (
      <p>
        Another Placeholder Component For: <strong>{this.props.location.pathname}</strong>
      </p>
    );
  }
}
