import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class SidebarContent extends PureComponent {
  static propTypes = {
    /** Children Nodes */
    children: PropTypes.node.isRequired,
    /** Primary content when Sidebar expanded */
    primary: PropTypes.bool
  };

  static defaultProps = {
    primary: false
  }

  render() {
    return (
      <div className="sidebar-content px-0">
        {this.props.children}
      </div>
    );
  }
}
