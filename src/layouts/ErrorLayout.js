import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';

const styles = {
  root: {
    width: '100%'
  },
  code: {
    fontSize: '5em',
    paddingTop: '10%',
    marginBottom: "20px",
    fontWeight: 100
  }
};

/**
 * THIS IS GOING TO GO AWAY AND ABSTRACTED TO A SHARED COMPONENT
 * SO WE CAN MAINTAIN CONSISTENT ERROR LAYOUTS
 */
export default class ErrorLayout extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired, // Route Matching
  }

  constructor() {
    super();
    this.state = {
      codeMap: {
        404: 'errors.404',
        500: 'errors.500',
        502: 'errors.502',
        503: 'errors.503',
        504: 'errors.504'
      }
    };
  }

  componentWillMount() {
    let code = 500;
    const status = this.props.match.params.statusCode;
    if (Object.keys(this.state.codeMap).indexOf(status) !== -1) {
      code = status;
    }

    this.setState({
      code
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.code !== nextState.code;
  }

  render() {
    return (
      <div className="row m-0" style={styles.root}>
        <div className="col text-center p-4">
          <h1 style={styles.code}>{this.state.code}</h1>
          <p style={styles.message}>
            <FormattedMessage id={this.state.codeMap[this.state.code]}/>
          </p>
          <Link to="/">
            Back
          </Link>
        </div>
      </div>
    );
  }
}
