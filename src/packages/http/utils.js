// Polyfill for URLSearchParams
// @see https://github.com/WebReflection/url-search-params
import URLSearchParams from 'url-search-params';
import {HTTP_REQUEST_METHODS} from './constants';

/**
 * Construct the Authorization Header Value
 */
export const buildAuthHeaderValue = function(token, suffix = 'x') {
  return `Basic ${window.btoa(`${token}:${suffix}`)}`;
};

/**
 * Take GET/DELETE Request Params and make them URL friendly
 */
export const buildRequestParams = function(params) {
  let requestParams = new URLSearchParams();
  if (!Object.keys(params).length) {
    return requestParams;
  }

  for (let param in params) {
    if (Array.isArray(params[param])) {
      params[param].map((item) => {
        let p = param;
        // Came from a form, no need to duplicate
        if (p.indexOf('[]') !== -1) {
          p = param.slice(0, -2);
        }
        if (typeof item === 'object') {
          for (let key in item) {
            requestParams.append(`${p}[][${key}]`, item[key]);
          }
        } else {
          requestParams.append(`${p}[]`, item);
        }
      });
    } else {
      requestParams.append(param, params[param]);
    }
  }
  return requestParams;
};

/**
 * Get HTTP Request Options for `fetch` call
 */
export const getRequestOptions = function(method, data, headers) {
  let requestOptions = {
    method,
    headers: headers ? headers : {}
  };

  switch (method) {
  case HTTP_REQUEST_METHODS.PATCH:
  case HTTP_REQUEST_METHODS.POST:
  case HTTP_REQUEST_METHODS.PUT:
    if (typeof data === 'object') {
      requestOptions.body = JSON.stringify(data);
    }
    break;
  case HTTP_REQUEST_METHODS.GET:
  case HTTP_REQUEST_METHODS.DELETE:
    if (typeof data === 'object') {
      let params = buildRequestParams(data).toString();
      if (params) {
        requestOptions.search = params;
      }
    }
    break;
  case HTTP_REQUEST_METHODS.OPTIONS:
    break;
  default:
    throw new Error(`Unsupported HTTP Method: ${method}`);
  }
  return requestOptions;
};

/**
 * Build the Request object to be used in conjunction with `fetch`
 */
export const buildRequestObject = function(uri, method, data, headers) {
  const requestOptions = getRequestOptions(method, data, headers);
  if (requestOptions.search) {
    uri += '?' + requestOptions.search.toString();
  }

  return {
    uri,
    options: requestOptions
  };
};

/**
 * Check if statusCode from Response is within successful range
 */
export const isSuccessfulStatus = function(status) {
  const successfulStatus = 200;
  const redirectionStatus = 400;
  return status >= successfulStatus && status < redirectionStatus;
};

/**
 * Validate Status Code From HTTP Request
 */
export const validateResponse = function(response) {
  if (!isSuccessfulStatus(response.status)) {
    let error = new Error(response.statusText);
    error.status = response.status;
    error.response = response;
    throw error;
  }
  return response;
};
