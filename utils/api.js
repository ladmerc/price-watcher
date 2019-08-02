'use strict';

const fetch = require('isomorphic-fetch');

module.exports = {
  get: (url, opts) => {
    return new Promise((resolve, reject) => {
      fetch(url, opts)
      .then((response) => {
        response.json()
        .then(json => {
          if (response.status >= 400) return reject(json);
          resolve(json);
        })
        .catch(() => reject({ status: response.status, json: null }));
      }).catch(reject)
    })
  }
};