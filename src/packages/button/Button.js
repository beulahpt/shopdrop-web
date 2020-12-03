import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class Button extends PureComponent {

  static propTypes = {
    /** Bootstrap Button Types */
    type: PropTypes.oneOf([
      'default',
      'light',
      'dark',
      'link',
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'danger',
      'error',
      'outline-default',
      'outline-primary',
      'outline-secondary',
      'outline-light',
      'outline-dark',
      'outline-link',
      'outline-success',
      'outline-warning',
      'outline-danger',
      'outline-info'
    ]),
    /** Button Size */
    size: PropTypes.oneOf([
      'sm',
      'md',
      'lg'
    ]),
    /** Button Type Submit */
    submit: PropTypes.bool,
    /** Button Disabled */
    disabled: PropTypes.bool,
    /** Custom Root Classes */
    classNames: PropTypes.string,
    /** Button Icon */
    icon: PropTypes.string,
    /** Button Label Text */
    label: PropTypes.string,
    /** Button title attribute */
    title: PropTypes.string,
    /** On Click Event */
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  }

  static defaultProps = {
    type: 'default',
    classNames: '',
    title: '',
    size: 'sm',
    icon: null,
    label: '',
    submit: false,
    disabled: false,
    onClick: null,
    onMouseEnter: null,
    onMouseLeave: null
  };

  render() {
    const {type, size, disabled, title, label, icon, classNames, onClick, onMouseEnter, onMouseLeave, submit} = this.props;
    return (
      <button
        type={submit ? 'submit' : 'button'}
        className={`text-uppercase btn btn-${type} btn-${size} ${classNames}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        disabled={disabled}
        title={title}
      >
        {
          icon ?
            <i className={`${icon} ${label ? 'mr-1' : ''}`} /> :
            null
        } {label}
      </button>
    );
  }
}
