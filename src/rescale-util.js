/*jshint node:true */

'use strict';

var util = require('util');

var error = '',
    validScaleExample = 'Eg. [0, 1]';

exports.isValidScale = function isValidScale(scale) {
  if (!util.isArray(scale) || scale.length !== 2) {
    setError('the scale must be an Array with two elements');

    return false;
  }

  if (!Number.isFinite(scale[0]) || !Number.isFinite(scale[1])) {
    setError('the extremes must be finite numbers');

    return false;
  }

  if (scale[0] === scale[1]) {
    setError('the extremes cannot be the same');

    return false;
  }

  return true;
};

exports.getLastError = function getLastError() {
  return error;
};

exports.resetLastError = function getLastError() {
  error = '';
};

function setError(newError) {
  error = newError + '. ' + validScaleExample;
}
