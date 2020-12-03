import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

/**
 *
 */
export default class Sidebar extends PureComponent {
  static propTypes = {
    /** Children nodes */
    children: PropTypes.arrayOf(PropTypes.node).isRequired
  };

  constructor() {
    super();
    this.state = {
      open: true
    };
  }

  toggleBar = () => {
    const open = !this.state.open;
    this.setState({open});
  };

  render() {
    const {children} = this.props;

    return (
      <div className={`sidebar z-index-10 ${this.state.open ? "" : "sidebar-collapsed"}`}>
        {React.Children.map(children, (child) => {
          const hidden = child.props.primary ? !this.state.open : this.state.open;
          if (!hidden) {
            return (child);
          }
        })}
        <div className="sidebar-trigger-container">
          <div className={`sidebar-trigger ${this.state.open ? '' : 'sidebar-collapsed'}`}>
            <i onClick={this.toggleBar} className="fal fa-arrow-circle-left text-muted mt-1"/>
          </div>
        </div>
      </div>
    );
  }
}
