
// Polyfill for fetch
// @see https://github.com/github/fetch
import 'whatwg-fetch';

import {HTTP_STATUS} from './constants';
import {buildRequestObject, validateResponse} from './utils';

/**
 * Execute Fetch Request
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 *
 *  Fetch doesn't have abort within the spec and is being actively discussed
 *  https://github.com/whatwg/fetch/issues/27
 *  https://github.com/domenic/cancelable-promise
 *  https://github.com/zenparsing/es-cancel-token
 */
export const fetchRequest = function(endpoint, method, headers, data) {
  let request = buildRequestObject(endpoint, method, data, headers);
  return fetch(request.uri, request.options)
    .then((response) => {
      return validateResponse(response);
    })
    .then((response) => {
      return response.status === HTTP_STATUS.NO_CONTENT ? null : response.json();
    });
};

export default fetchRequest;
