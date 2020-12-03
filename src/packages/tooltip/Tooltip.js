import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Tooltip extends PureComponent {
  static propTypes = {
    /** Toggling Element */
    children: PropTypes.node.isRequired,
    /** Tooltip Content (Text/Node) */
    content: PropTypes.any.isRequired,
    /** Tooltip Positioning */
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /** Tooltip Trigger Event */
    trigger: PropTypes.oneOf(['hover', 'click', 'focus'])
  };

  static defaultProps = {
    position: 'right',
    trigger: 'hover'
  };

  constructor(props) {
    super(props);
    this.tooltip = null;
    this.visible = false;
    // This could be a React 16 Portal, might want to look into converting it?
    this.containerNode = document.createElement('div');
  }

  componentDidUpdate(prevProps) {
    if (this.visible) {
      const didContentChange = this.props.content !== prevProps.content;
      const didPositionChange = this.props.position !== prevProps.position;
      if (didContentChange || didPositionChange) {
        this.show(true);
      }
    }
  }

  componentWillUnmount() {
    this.cleanup();
  }

  cleanup() {
    this.visible = false;
    this.tooltip = null;

    if (ReactDOM.unmountComponentAtNode(this.containerNode)) {
      document.body.removeChild(this.containerNode);
    }
  }

  show = (force) => {
    if (this.visible && !force) {
      return;
    }

    this.visible = true;

    document.body.appendChild(this.containerNode);

    // Wrap with Bootstrap 4 classes
    this.tooltip = ReactDOM.render((
      <div className={`tooltip show bs-tooltip-${this.props.position}`} role="tooltip">
        <div className="arrow" />
        <div className="tooltip-inner">
          {this.props.content}
        </div>
      </div>
    ), this.containerNode);

    this.resetOffset();
  }

  hide = () => {
    if (this.visible) {
      this.cleanup();
    }
  }

  resetOffset() {
    if (this.tooltip) {
      const tooltip = ReactDOM.findDOMNode(this.tooltip);
      const {top, left} = this.getOffset(tooltip);
      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
    }
  }

  getOffset(tooltip) {
    const node = ReactDOM.findDOMNode(this);
    const {top, left} = node.getBoundingClientRect();
    let offset = {
      top: top + document.body.scrollTop,
      left: left + document.body.scrollLeft
    };

    // Position element in the center of the root node
    switch (this.props.position) {
    case 'top':
      offset.top -= tooltip.offsetHeight;
      offset.left += (node.offsetWidth / 2 - tooltip.offsetWidth / 2);
      break;
    case 'bottom':
      offset.top += node.offsetHeight;
      offset.left += (node.offsetWidth / 2 - tooltip.offsetWidth / 2);
      break;
    case 'right':
      offset.top += (node.offsetHeight / 2 - tooltip.offsetHeight / 2);
      offset.left += node.offsetWidth;
      break;
    case 'left':
    default:
      offset.top += (node.offsetHeight / 2 - tooltip.offsetHeight / 2);
      offset.left -= tooltip.offsetWidth;
    }

    return offset;
  }

  _trigger(action, cb, e) {
    if (action) {
      action(e);
    }
    return cb ? cb() : null;
  }

  _toggle(cb, e) {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
    return cb ? cb(e) : null;
  }

  render() {
    // Expects single child
    const el = React.Children.only(this.props.children);
    const {disabled, onClick, onBlur, onFocus, onMouseEnter, onMouseLeave} = el.props;

    let props = {};

    // https://github.com/facebook/react/issues/10109
    // We must not show tooltip when button is disabled
    if (disabled) {
      return el;
    }

    switch (this.props.trigger) {
    case 'click':
      props.onClick = this._toggle.bind(this, onClick);
      break;
    case 'hover':
      props.onMouseEnter = this._trigger.bind(this, this.show, onMouseEnter);
      props.onMouseLeave = this._trigger.bind(this, this.hide, onMouseLeave);
      break;
    case 'focus':
    default:
      props.onFocus = this._trigger.bind(this, this.show, onFocus);
      props.onBlur = this._trigger.bind(this, this.hide, onBlur);
      break;
    }

    return React.cloneElement(el, props);
  }
}
