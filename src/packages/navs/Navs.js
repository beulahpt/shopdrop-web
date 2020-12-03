import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

/**
 * Navs Component
 * https://getbootstrap.com/docs/4.0/components/navs/
 */
export default class Navs extends PureComponent {
  static propTypes = {
    /** Default active tab */
    defaultTab: PropTypes.number,
    /** Nav type */
    type: PropTypes.oneOf(['pills', 'tabs']),
    /** Tab Size */
    size: PropTypes.oneOf(['sm', 'lg']),
    /** Tab Children components */
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    defaultTab: 0,
    type: 'tabs',
    size: 'sm'
  }

  componentWillMount() {
    this.setState({
      activeTab: this.props.defaultTab
    });
  }

  handleClick = (activeTab) => {
    console.log("Click Handled");
    this.setState({activeTab});
  }

  cloneChildren() {
    const {activeTab} = this.state;
    const onClick = this.handleClick;

    return React.Children.map(this.props.children, (child, index) => {
      if (child) {
        return React.cloneElement(child, {
          index,
          isActive: index === activeTab,
          onClick
        });
      }
      return null;
    });
  }

  render() {
    const {children, type, size} = this.props;
    const {activeTab} = this.state;

    return [
      <ul key="nav-children" className={`nav nav-${type} nav-${size}`}>
        {this.cloneChildren()}
      </ul>,
      <div key="active-child" className="active-tab p-2">
        {children[activeTab] ? children[activeTab].props.children : null}
      </div>
    ];
  }
}
