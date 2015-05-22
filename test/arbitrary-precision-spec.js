/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var optionale = require('optionale');
var arbitraryPrecision = require('../src/arbitrary-precision');

var load = arbitraryPrecision.load;
var isAvailable = arbitraryPrecision.isAvailable;

describe('arbitrary precision', function() {
  describe('load', function () {
    var optionalMock;

    afterEach(function() {
      optionalMock.verify();
    });

    it('should delegate to optionale.optionale', function() {
      optionalMock = sinon.mock(optionale);

      optionalMock.expects('optionale')
        .withExactArgs('big.js')
        .returns('something');

      load().should.be.exactly('something');
    });
  });

  describe('isAvailable', function () {
    var optionalStub;

    beforeEach(function() {
      optionalStub = sinon.stub(optionale, 'optionale');

      optionalStub
        .onFirstCall().returns('something')
        .onSecondCall().returns(undefined);
    });

    afterEach(function() {
      optionalStub.restore();
    });

    it('should return whether arbitrary precision is available', function() {
      load();
      isAvailable().should.be.exactly(true);

      load();
      isAvailable().should.be.exactly(false);
    });
  });
});
