/*jshint node:true */

'use strict';

var error = '',
    validScaleExample = 'Eg. [0, 1]',
    validPresetExample = 'Eg. [[0, 100], [32, 212]]',
    validPresetsExample = 'Eg. [[[0, 100], [32, 212]], [[0, 100], [-273.15, -173.15]]]',
    api = {};

function RescaleError(message) {
  this.name = 'RescaleError';
  this.message = message;
  this.stack = (new Error()).stack;
}

RescaleError.prototype = Object.create(Error.prototype);
RescaleError.prototype.constructor = RescaleError;

exports.RescaleError = RescaleError;

exports.isValidScale = api.isValidScale = function isValidScale(scale) {
  if (!Array.isArray(scale) || scale.length !== 2) {
    setScaleError('the scale must be an Array with two elements');

    return false;
  }

  if (!isFinite(scale[0]) || !isFinite(scale[1])) {
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
  if (!Array.isArray(preset) || preset.length !== 2) {
    setPresetError('a preset must be an Array with two scales');

    return false;
  }

  return preset.every(function (scale) {
    return api.isValidScale(scale);
  });
};

exports.areValidPresets = function areValidPresets(presets) {
  if (!Array.isArray(presets)) {
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
