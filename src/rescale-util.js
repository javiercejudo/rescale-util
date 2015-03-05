'use strict';

var util = require('util');

var error = '',
    validScaleExample = 'Eg. [0, 1]';

/**
 * @param {Array} scale
 *
 * @return {Boolean}
 */
exports.isValidScale = function isValidScale(scale) {
  if (!util.isArray(scale) || scale.length !== 2) {
    setError('the scale must be an Array with two elements');

    return false;
  }

  if (Math.abs(scale[0]) === Infinity || Math.abs(scale[1]) === Infinity) {
    setError('the extremes cannot be Infinity');

    return false;
  }

  if (scale[0] === scale[1]) {
    setError('the extremes cannot be the same');

    return false;
  }

  return true;
}

/**
 * @return {String}
 */
exports.getLastError = function getLastError() {
  return error;
}

/**
 * @return {void}
 */
exports.resetLastError = function getLastError() {
  error = '';
}

/**
 * @param {String} newError description of the new error
 *
 * @return {void}
 */
function setError(newError) {
  error = newError + '. ' + validScaleExample;
}
