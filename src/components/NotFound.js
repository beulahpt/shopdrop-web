import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class NotFound extends PureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={"text-center"} style={{marginTop: '20%'}}>
        <h1 className={'font-weight-light'}>
          Oops, Page Not Found
        </h1>
        <p>
        </p>
      </div>
    );
  }
}
