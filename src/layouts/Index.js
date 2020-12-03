import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class IndexLayout extends PureComponent {
  render() {
    return (
      <div className="row m-0 w-100">
        <div className="col">
          <div className={"font-weight-lighter"}>
            <h2>
              Welcome to your new app
            </h2>
          </div>
        </div>
      </div>
    );
  }
}
