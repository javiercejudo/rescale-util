/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescaleUtil = require('../src/rescale-util');

var isValidScale = rescaleUtil.isValidScale;
var isValidPreset = rescaleUtil.isValidPreset;
var areValidPresets = rescaleUtil.areValidPresets;
var getLastError = rescaleUtil.getLastError;
var resetLastError = rescaleUtil.resetLastError;
var RescaleError = rescaleUtil.RescaleError;

describe('utility', function() {
  describe('isValidScale', function () {
    describe('called with proper scales', function () {
      it('should validate', function() {
        isValidScale([Math.PI, 0]).should.be.exactly(true);
        isValidScale([-4/3, -1]).should.be.exactly(true);
      });
    });

    describe('called with improper scales', function () {
      afterEach(function () {
        resetLastError();
      });

      it('should not validate', function() {
        isValidScale([-Infinity, 0]).should.be.exactly(false);
        isValidScale([3, 3]).should.be.exactly(false);
        isValidScale(NaN).should.be.exactly(false);
        isValidScale({min: 0, max: 5}).should.be.exactly(false);
        isValidScale(-4).should.be.exactly(false);
        isValidScale(['1', '2']).should.be.exactly(false);
      });
    });
  });

  describe('isValidPreset', function () {
    describe('called with proper presets', function () {
      it('should validate', function() {
        isValidPreset([[Math.PI, 0], [Math.E, 5]]).should.be.exactly(true);
        isValidPreset([[0, 100], [32, 212]]).should.be.exactly(true);
      });
    });

    describe('called with improper presets', function () {
      afterEach(function () {
        resetLastError();
      });

      it('should not validate', function() {
        isValidPreset([-Infinity, 0]).should.be.exactly(false);
        isValidPreset([[-Infinity, 0], [0, 5]]).should.be.exactly(false);
        isValidPreset(NaN, NaN).should.be.exactly(false);
        isValidPreset([-5, -2], {min: 0, max: 5}).should.be.exactly(false);
      });
    });
  });

  describe('areValidPreset', function () {
    describe('called with proper presets', function () {
      it('should validate', function() {
        areValidPresets([[[Math.PI, 0], [Math.E, 5]], [[0, 100], [32, 212]]])
          .should.be.exactly(true);
      });
    });

    describe('called with improper presets', function () {
      afterEach(function () {
        resetLastError();
      });

      it('should not validate', function() {
        areValidPresets([[-Infinity, 0]]).should.be.exactly(false);
        areValidPresets(NaN, NaN).should.be.exactly(false);
        areValidPresets([-5, -2], {min: 0, max: 5}).should.be.exactly(false);
      });
    });
  });

  describe('getLastError', function () {
    afterEach(function () {
      resetLastError();
    });

    it('should return an empty string when no errors exist', function() {
      getLastError().should.be.exactly('');
      isValidScale([0, 5]);
      getLastError().should.be.exactly('');
    });

    it('should recognise non-array scales', function() {
      isValidScale(-4);
      getLastError().should.match(/^the scale must be an Array with two elements*/);
    });

    it('should recognise scales where either extreme is not a finite number', function() {
      var extremesErrorMessageRegex = (/^the extremes must be finite numbers*/);

      isValidScale([-Infinity, 0]);
      getLastError().should.match(extremesErrorMessageRegex);
      resetLastError();

      isValidScale([0, Infinity]);
      getLastError().should.match(extremesErrorMessageRegex);
      resetLastError();

      isValidScale([-Infinity, Infinity]);
      getLastError().should.match(extremesErrorMessageRegex);
      resetLastError();

      isValidScale(['a', 1]);
      getLastError().should.match(extremesErrorMessageRegex);
      resetLastError();

      isValidScale(['1', '3']);
      getLastError().should.match(extremesErrorMessageRegex);
    });

    it('should recognise scales where the extremes are equal', function() {
      isValidScale([3, 3]);
      getLastError().should.match(/^the extremes cannot be the same*/);
    });

    it('should recognise non-array presets', function() {
      isValidPreset(45);
      getLastError().should.match(/^a preset must be an Array with two scales*/);
    });
  });

  describe('resetLastError', function () {
    it('should reset the last error', function() {
      isValidScale(Math.LOG2E);
      getLastError().should.not.be.exactly('');
      resetLastError();
      getLastError().should.be.exactly('');
    });
  });

  describe('RescaleError', function () {
    it('should be an instance of Error', function() {
      (new RescaleError()).should.be.an.instanceof(Error);
    });

    it('should be named RescaleError', function() {
      (new RescaleError()).name.should.be.exactly('RescaleError');
    });
  });
});
