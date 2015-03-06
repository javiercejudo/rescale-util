/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescaleUtil = require('../src/rescale-util.js');

var isValidScale = rescaleUtil.isValidScale;
var getLastError = rescaleUtil.getLastError;
var resetLastError = rescaleUtil.resetLastError;

describe('utility', function() {
  describe('isValidScale called with proper scales', function () {
    it('should validate', function() {
      isValidScale([Math.PI, 0]).should.be.exactly(true);
      isValidScale([-4/3, -1]).should.be.exactly(true);
    });
  });

  describe('isValidScale called with improper scales', function () {
    afterEach(function () {
      resetLastError();
    });

    it('should not validate', function() {
      isValidScale([-Infinity, 0]).should.be.exactly(false);
      isValidScale([3, 3]).should.be.exactly(false);
      isValidScale(NaN).should.be.exactly(false);
      isValidScale({min: 0, max: 5}).should.be.exactly(false);
      isValidScale(-4).should.be.exactly(false);
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

    it('should reject non-array scales', function() {
      isValidScale(-4);
      getLastError().should.match(/^the scale must be an Array with two elements*/);
    });

    it('should reject scales where either extreme is not a finite number', function() {
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
    });

    it('should reject scales where the extremes are equal', function() {
      isValidScale([3, 3]);
      getLastError().should.match(/^the extremes cannot be the same*/);
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
});
