import {
  SALES_FETCHED,
  SALE_FETCHED
} from './../constants/ActionTypes';

/**
 * Collection of orders fetched action
 */
export const salesFetched = (sales) => {
  return {
    type: SALES_FETCHED,
    sales
  };
};

export const saleFetched = (sale) => {
  return {
    type: SALE_FETCHED,
    sale
  };
};
