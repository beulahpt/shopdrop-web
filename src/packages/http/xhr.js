import {buildRequestObject, validateResponse} from './utils';

/**
 * Execute an XHR request
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 * @param endpoint String
 * @param method String
 * @param data Object
 * @param headers Object
 * @param onSuccess Function
 * @param onError Function
 */
const xhrRequest = function(endpoint, method, headers, data, onSuccess, onError = null) {
  const request = buildRequestObject(endpoint, method, data, headers);
  const xhr = new XMLHttpRequest();

  xhr.open(request.options.method, request.uri, true);

  for (let header of Object.keys(request.options.headers)) {
    xhr.setRequestHeader(header, request.options.headers[header]);
  }

  xhr.onload = function() {
    try {
      const response = validateResponse(this);
      onSuccess(JSON.parse(response.responseText));
    } catch (e) {
      if (onError) {
        onError(e);
      }
    }
  };

  xhr.send(request.options.body ? request.options.body : null);

  // Return so we can abort
  return xhr;
};

/**
 * Execute a "Cancelable" Promise
 * A Rudamentary implementation to support a Cancelable Promise
 * Unil the spec is completed and native implementations are built out
 * @SEE https://github.com/tc39/proposal-cancelable-promises
 */
export const xhrCancelableRequest = function(endpoint, method, headers, data) {
  let xhr;
  let promise = new Promise(function(resolve, reject) {
    xhr = xhrRequest(endpoint, method, headers, data, resolve, reject);
    xhr.onabort = reject;
  });
  /**
   * Attach an abort method to the promise
   */
  promise.abort = function() {
    xhr.abort();
  };
  return promise;
};


export default xhrRequest;
