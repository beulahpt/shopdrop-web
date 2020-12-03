import {xhrCancelableRequest} from './xhr';
import fetchRequest from './fetch';
import {HTTP_REQUEST_METHODS} from './constants';
import {buildAuthHeaderValue} from './utils';
import Observer from './observer';

/**
 * Verve HTTP Wrapper
 */
export default class VerveHttp {

  static instance;

  constructor() {
    if (VerveHttp.instance) {
      return VerveHttp.instance;
    }

    this.activeRequests = 0;
    // Allow for external subscribers to observe request changes
    // Currently this observer is used for request count observations
    this.activeRequestsObserver = new Observer();

    VerveHttp.instance = this;
    return this;
  }

  setURI(uri) {
    this.uri = uri.endsWith("/") ? uri : `${uri}/`;
  }

  setAuth(token) {
    this.auth = buildAuthHeaderValue(token);
  }

  getHeaders(headers) {
    return Object.assign({
      'Authorization': this.auth,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, headers || {});
  }

  getUrl(endpoint) {
    if (endpoint.indexOf('http') === -1) {
      return this.uri + endpoint;
    }
    return endpoint;
  }

  /**
   * Register Promise Request so we can observe their changes
   * Here we are tracking active request counts
   */
  registerRequest = (promise) => {
    this.activeRequests += 1;
    this.activeRequestsObserver.emit(this.activeRequests);

    const decrementAndEmit = () => {
      this.activeRequests -= 1;
      this.activeRequestsObserver.emit(this.activeRequests);
    };

    promise.then(decrementAndEmit);
    promise.catch(decrementAndEmit);

    return promise;
  }

  subscribeToRequests = (cb) => {
    this.activeRequestsObserver.subscribe(cb);
  }

  unsubscribeFromRequests = (cb) => {
    this.activeRequestsObserver.unsubscribe(cb);
  }

  options(endpoint) {
    return this.registerRequest(
      xhrCancelableRequest(
        this.getUrl(endpoint),
        HTTP_REQUEST_METHODS.OPTIONS,
        this.getHeaders(),
        null
      )
    );
  }

  getAbortable(endpoint, params, headers = null) {
    return this.registerRequest(
      xhrCancelableRequest(
        this.getUrl(endpoint),
        HTTP_REQUEST_METHODS.GET,
        this.getHeaders(headers),
        params
      )
    );
  }

  getCollection(endpoint, params, headers = null) {
    return this.registerRequest(
      fetchRequest(
        this.getUrl(endpoint),
        HTTP_REQUEST_METHODS.GET,
        this.getHeaders(headers),
        params
      )
    );
  }

  get(endpoint, params, headers = null) {
    return this.registerRequest(
      fetchRequest(
        this.getUrl(endpoint),
        HTTP_REQUEST_METHODS.GET,
        this.getHeaders(headers),
        params
      )
    );
  }

  uploadFile(presignedUrl, file, headers = null, onProgress = null) {
    return this.registerRequest(
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(HTTP_REQUEST_METHODS.PUT, presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);

        if (headers) {
          for (let header of Object.keys(headers)) {
            xhr.setRequestHeader(header, headers[header]);
          }
        }

        const data = new FormData();
        data.append("file", file);

        if (onProgress && typeof onProgress === 'function') {
          xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
              onProgress(e);
            }
          };
        }

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve();
            } else {
              reject({
                status: xhr.status,
                statusText: xhr.statusText
              });
            }
          }
        };

        xhr.send(data);
      })
    );
  }

  post(endpoint, params, headers = null) {
    return this.registerRequest(
      fetchRequest(
        this.getUrl(endpoint),
        HTTP_REQUEST_METHODS.POST,
        this.getHeaders(headers),
        params
      )
    );
  }

  put(endpoint, params, headers = null) {
    return this.registerRequest(
      fetchRequest(
        this.getUrl(endpoint),
        HTTP_REQUEST_METHODS.PUT,
        this.getHeaders(headers),
        params
      )
    );
  }

  patch(endpoint, params, headers = null) {
    return this.registerRequest(
      fetchRequest(
        this.getUrl(endpoint),
        HTTP_REQUEST_METHODS.PATCH,
        this.getHeaders(headers),
        params
      )
    );
  }

  remove(endpoint, params, headers = null) {
    return this.registerRequest(
      fetchRequest(
        this.getUrl(endpoint),
        HTTP_REQUEST_METHODS.DELETE,
        this.getHeaders(headers),
        params
      )
    );
  }
}
