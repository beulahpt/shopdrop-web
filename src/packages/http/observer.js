
/**
 * Rudimentary Observer
 */
export default class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(cb) {
    this.observers.push(cb);
  }

  unsubscribe(cb) {
    this.observers = this.observers
      .filter((fn) => fn === cb ? null : fn);
  }

  emit = (message) => {
    this.observers
      .map((observer) => observer(message));
  }
}
