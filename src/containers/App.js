import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import store from 'store/dist/store.modern';


import {STORE_KEYS} from './../constants/Store';
import AppLayout from './../layouts/App';

// Comes from Webpack external

// Setup HTTP Event listeners and HTTP Credentials (singleton)

// Setup SSO Client

/**
 * Subscribe to API Request Count Events
 * @param {Func} cb
 */

/**
 * Unsubscribe from Request Count
 * @param {Func} cb
 */

const initialState = {
  app: {
    user: null
  }
};

export const mapStateToProps = (state = initialState) => {
  return {
    user: state.app.user
  };
};

/**
 * Branding Click Event, push back home
 */
export const onBrandingClick = () => {
  return (dispatch) => {
    dispatch(push('/'));
  };
};

/**
 * Perform logout and redirect to SSO
 */


/**
 * Fetch the Authenticated User
 */


const AppContainer = connect(
  mapStateToProps,
  {
    onBrandingClick
  }
)(AppLayout);

export default AppContainer;
