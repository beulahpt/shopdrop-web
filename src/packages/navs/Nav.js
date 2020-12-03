import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

/**
 * Nested Nav Component
 * https://getbootstrap.com/docs/4.0/components/navs/
 */
export default class Nav extends PureComponent {
  static propTypes = {
    /** IsActive flag */
    isActive: PropTypes.bool,
    /** Font awesome icon (fa-x) */
    icon: PropTypes.string,
    /** Title text */
    title: PropTypes.string,
    /** Tab index */
    index: PropTypes.number,
    /** Click handler */
    onClick: PropTypes.func
  };

  static defaultProps = {
    isActive: false,
    icon: '',
    title: '',
    index: 0,
    onClick: null
  }

  render() {
    const {index, icon, isActive, onClick, title} = this.props;
    return (
      <li className="nav-item">
        <a className={`nav-link ${isActive ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onClick(index);
          }}
        >
          {
            icon ? <i className={`nav-icon ${icon} mx-1`}/> : null
          }
          {
            title ? <span>{title}</span> : null
          }
        </a>
      </li>
    );
  }
}
