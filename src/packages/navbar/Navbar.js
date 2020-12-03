import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class Navbar extends PureComponent {
  static propTypes = {
    /** Application branding string */
    /** Floating boolean which determines fixed or floating positioning */
    floating: PropTypes.bool,
    /** Application version string (preferably semantic x.x.x) */
    /** Use Velocity Branding */
    velocityBranded: PropTypes.bool,
    /** Display Search Icon */
    search: PropTypes.bool,
    /** HTTP Link to Privacy/Terms */
    helpLink: PropTypes.string,
    /** Logout click event  */
    onLogoutClick: PropTypes.func,
    /** Profile click event  */
    onProfileClick: PropTypes.func,
    /** Settings click event  */
    onSettingsClick: PropTypes.func,
    /** Allow control when branding is clicked */
    onBrandingClick: PropTypes.func
  }

  static defaultProps = {
    floating: false,
    velocityBranded: false,
    version: null,
    search: false,
    helpLink: '#',
    onProfileClick: null,
    onSettingsClick: null,
    onBrandingClick: null
  };

  extractInitials = (username) => {
    if (!username) {
      return '';
    }

    return username.split(' ').reduce((acc, word) => {
      if (acc.length > 0) {
        acc = acc.charAt(0) + word.charAt(0).toUpperCase();
      } else {
        acc += word.charAt(0).toUpperCase();
      }
      return acc;
    }, '');
  }

  render() {
    const {
      account, brand, email, username, version, floating, search, helpLink, velocityBranded,
      onProfileClick, onSettingsClick, onLogoutClick, onBrandingClick
    } = this.props;

    return (
      <nav key="main-navbar" className={`navbar collapse navbar-collapse navbar-expand-lg navbar-dark text-white ${floating ? "" : "fixed-top"}`}>
        <div className="container-fluid p-0">
          <div className="col-9 col-sm-7 col-md-6 p-0">
            <div onClick={onBrandingClick} className={`${velocityBranded ? 'navbar__velocitylogo' : 'navbar__logo'} align-middle d-inline-block`}/>
            <div className="d-inline-block font-weight-light navbar__brand">
              {brand}
              {
                version ?
                  <small className="d-none d-sm-inline-block navbar__brand--hover ml-2 font-weight-light text-small">
                    {`v${version}`}
                  </small> : null
              }
            </div>
          </div>
          <div>
            {search ?
              <i className="d-inline-block fal fa-search mx-2" aria-hidden="true" />
              : null
            }
          </div>
        </div>
      </nav>
    );
  }
}
