/*jshint node:true */

'use strict';

var util = require('util');

var error = '',
    validScaleExample = 'Eg. [0, 1]',
    validPresetExample = 'Eg. [[0, 100], [32, 212]]',
    validPresetsExample = 'Eg. [[[0, 100], [32, 212]], [[0, 100], [-273.15, -173.15]]]',
    api = {};

function RescaleError(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}

util.inherits(RescaleError, Error);
RescaleError.prototype.name = 'RescaleError';

exports.RescaleError = RescaleError;

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

exports.isValidPreset = api.isValidPreset = function isValidPreset(preset) {
  if (!util.isArray(preset) || preset.length !== 2) {
    setPresetError('a preset must be an Array with two scales');

    return false;
  }

  return preset.every(function (scale) {
    return api.isValidScale(scale);
  });
};

exports.areValidPresets = function areValidPresets(presets) {
  if (!util.isArray(presets)) {
    setPresetsError('presets must be an Array with presets');

    return false;
  }

  return presets.every(function (preset) {
    return api.isValidPreset(preset);
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

function setPresetsError(newError) {
  error = newError + '. ' + validPresetsExample;
}
