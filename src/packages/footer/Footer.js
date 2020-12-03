import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class Footer extends PureComponent {
  static propTypes = {
    /** Custom css classnames */
    classes: PropTypes.string,
    /** Text alignment */
    align: PropTypes.oneOf(['left', 'center', 'right']),
    /** Fixed positioning */
    fixed: PropTypes.bool
  }

  static defaultProps = {
    classes: '',
    align: 'left',
    fixed: true
  };

  constructor() {
    super();
    this.currentYear = new Date().getFullYear();
  }

  render() {
    return (
      <div className={`footer ${this.props.classes} py-2 px-3 font-weight-light text-small text-${this.props.align ? this.props.align : 'default'} ${this.props.fixed ? 'fixed-bottom' : ''}`}>
        | Copyright ©{this.currentYear}, All Rights Reserved |
      </div>
    );
  }
}
