/*jshint node:true */

'use strict';

var util = require('util');

var error = '',
    validScaleExample = 'Eg. [0, 1]',
    validPresetExample = 'Eg. [[0, 100], [32, 212]]',
    api = {};

exports.isValidScale = api.isValidScale = function isValidScale(scale) {
  if (!util.isArray(scale) || scale.length !== 2) {
    setScaleError('the scale must be an Array with two elements');

    return false;
  }

  if (!Number.isFinite(scale[0]) || !Number.isFinite(scale[1])) {
    setScaleError('the extremes must be finite numbers');

    return false;
  }

  if (scale[0] === scale[1]) {
    setScaleError('the extremes cannot be the same');

    return false;
  }

  return true;
};

exports.isValidPreset = function isValidPreset(preset) {
  if (!util.isArray(preset) || preset.length !== 2) {
    setPresetError('a preset must be an Array with two scales');

    return false;
  }

  return preset.every(function (scale) {
    return api.isValidScale(scale);
  });
};

exports.getLastError = function getLastError() {
  return error;
};

exports.resetLastError = function getLastError() {
  error = '';
};

function setScaleError(newError) {
  error = newError + '. ' + validScaleExample;
}

function setPresetError(newError) {
  error = newError + '. ' + validPresetExample;
}
