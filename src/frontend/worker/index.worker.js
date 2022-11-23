import { expose } from 'comlink';

const store = {
  // stores data in memory here
  /** @type {*} */
  data: {},

  // stores all functions that will be called when a data has been updated
  /** @type {*} */
  fns: {},
  /**
   *
   * @param {string} key
   * @param {*} value
   */
  set: async function (key, value) {
    // stores the data here
    this.data[`${key}`] = value;

    // check if the key exist in the data store
    if (this.fns[`${key}`]) {
      // for all callbackNames in the object of the function list given key
      for (const fn of Object.keys(this.fns[`${key}`])) {
        const func = this.fns[`${key}`][`${fn}`];
        // call the function
        await func(this.data[`${key}`]);
      }
    }
  },

  /**
   *
   * @param {string} key
   * @returns {*}
   */
  get: function (key) {
    // return the data
    return this.data[`${key}`];
  },

  // subscribes to a change in data and call the function
  /**
   *
   * @param {string} key
   * @param {string} callbackName
   * @param {*} callback
   */
  subscribe: function (key, callbackName, callback) {
    // if there is no existing set, create a set
    if (!this.fns[`${key}`]) {
      this.fns[`${key}`] = {};
    }

    // if there exists a callbackname, return an error
    if (this.fns[`${key}`][`${callbackName}`]) {
      throw new Error(`${callbackName} function exists in ${key}`);
    }

    this.fns[`${key}`][`${callbackName}`] = callback;
  },

  /**
   *
   * @param {string} key
   * @param {string} callbackName
   */
  unsubscribe: function (key, callbackName) {
    // if there is no existing set, return error
    if (!this.fns[`${key}`]) {
      throw new Error(`${key} doesn't exist on state`);
    }

    // if there is no existing callback, return error
    if (!this.fns[`${key}`][`${callbackName}`]) {
      throw new Error(`${callbackName} function doesn't exists in ${key}`);
    }

    // delete the callback subscription
    delete this.fns[`${key}`][`${callbackName}`];
  }
};

expose(store);
