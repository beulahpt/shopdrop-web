/** global process */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {renderRoutes} from 'react-router-config';

import Footer from '../packages/footer';
import Menu from '../packages/menu';
import Navbar from '../packages/navbar';
import {FaCartPlus, FaTag, FaBars, FaUser, FaSearch} from 'react-icons/fa';

import routes from './../routes';

// App Styles
import '../assets/styles/main.css';
import '../assets/styles/app.css';

export default class AppLayout extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    onBrandingClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null
  }

  /**
   * Observer HTTP Request Count Changes
   * If there are requests, animate progressbar
   * @param {number} requests
   */
  /*requestCountObserver = (requests) => {
    if (this.progressRef) {
      if (requests > 0) {
        this.progressRef.animate();
      } else {
        this.progressRef.complete();
      }
    }
  }*/

  /**
   * Save reference to flash node (component instance)
   */
 /* setFlashNode = (node) => {
    if (node) {
      this.flashNode = node;
    }
  }*/

  /**
   * Invoke clear on flashNode
   */
  /*clearFlashNode = () => {
    if (this.flashNode) {
      this.flashNode.clear();
    }
  }*/

  render() {
    const {user, location} = this.props;

      return (
        <main key="content" role="main" className="fullscreen">
          <div className="shopdrop-header-container">
			  <div className="shopdrop-header">
                <div className="shopdrop-header-left">
			      <div className="shopdrop-header-button">
                    <a href="#" className="toggle-menu-link">
			          <FaBars />
			        </a>
			        <span> Menu </span>
			      </div>
			      <div className="shopdrop-header-button">
                    <a href="#" className="show-search-link">
			          <FaSearch />
			        </a>
			        <span> Search </span>
			      </div>
			    </div>
                <div className="shopdrop-header-right">
			      <div className="shopdrop-header-button right">
                    <a href="#" className="show-profile-link">
			          <FaUser />
			        </a>
			        <span> Profile </span>
			      </div>
			      <div className="shopdrop-header-button">
                    <a href="#" className="show-brands-link">
			          <FaTag />
			        <span> Brands </span>
			        </a>
			      </div>
			      <div className="shopdrop-header-button">
                    <a href="#" className="show-cart-link">
			          <FaCartPlus />
			        <span> Cart </span>
			        </a>
			      </div>
			    </div>
			    <div className="shopdrop-header-logo">
                   <a href="#">
			         <img src="https://www.shopdropapp.com/img/logos/shopdroplogo_720.png" alt="shopdrop" />
			       </a>
			    </div>
			  </div>
          </div>
          <div className="shopdrop-body">
            <div className="shopdrop-wrapper">
              <div className="shopdrop-content">
                {renderRoutes(routes)}
              </div>
            </div>
          </div>
          <Footer classes="z-index-0" key="footer" floating fixed={false} align={"right"} />
        </main>
      );
  }
}
