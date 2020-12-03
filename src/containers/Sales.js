import {connect} from 'react-redux';

import {
  salesFetched,
  saleFetched
} from '../actions/sales';

import {
  getCollection,
  getResource,
  createResource
} from './shared';

import SalesLayout from '../layouts/Sales';
import {config} from './../config/env.js';

const initialState = {
  sales: [],
  sale: {}
};

export const mapStateToProps = (state = initialState) => {
  return {
	sales: state.sales.sales,
    sale: state.sales.sale,
  };
};

export const getSales = (metadata={}) => {
  return (dispatch) => {
    let uri = `${config.API_URI}/sales`;
    return getCollection(uri, {}, metadata, salesFetched)(dispatch);
  };
};

export const getSale = (id) => {
  return (dispatch) => {
    let uri = `${config.API_URI}/sales/${id}`;
    return getResource(uri, {}, saleFetched)(dispatch);
  };
};

export const submitSale = (sale) => {
  return (dispatch) => {
    let uri = `${config.API_URI}/sales`;
    return createResource(uri, sale, '')(dispatch);
  };
};

const SalesContainer = connect(
  mapStateToProps,
  {
    getSales,
    getSale,
    submitSale
  }
)(SalesLayout);

export default SalesContainer;
