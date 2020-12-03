import {assoc} from 'ramda';

import {normalizeCollection} from './shared/normalization';

import {
  SALES_FETCHED,
  SALE_FETCHED
} from './../constants/ActionTypes';

/**
 * Initial State Mapping
 */
const initialState = {
  sales: {
    metadata: {},
    results: []
  },
  sale: {}
};

/**
 * Orders Reducer
 * @param state Object
 * @param action Object
 */
export const sales = (state = initialState, action) => {
  switch (action.type) {
  case SALES_FETCHED:
    return assoc('sales', normalizeCollection(action.sales), state);
  case SALE_FETCHED:
    return assoc('sale', action.sale, state);
  default:
    return state;
  }
};

