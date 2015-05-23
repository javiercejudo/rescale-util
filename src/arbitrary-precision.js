/*jshint node:true */

'use strict';

var optionale = require('optionale');

var decimal;

/**
 * Loads arbitrary precision library if available and retruns it
 *
 * @return {*}
 */
exports.load = function load() {
  decimal = optionale.optionale('big.js');

  return decimal;
};

/**
 * Returns true if arbitrary precision is available and false otherwise
 *
 * @return {Boolean} Arbitrary precision availability
 */
exports.isAvailable = function isAvailable() {
  return typeof decimal !== 'undefined';
};
