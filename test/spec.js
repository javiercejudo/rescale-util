'use strict';

var should = require('should');
var rescaleUtil = require('../src/rescale-util.js');

describe('util', function() {
  describe('isValidScale', function () {
    var isValidScale = rescaleUtil.isValidScale;

    it('should validate proper scales', function() {
      isValidScale([0, 5]).should.be.exactly(true);
      isValidScale([-10, -4]).should.be.exactly(true);
    });

    it('should not validate improper scales', function() {
      isValidScale([-Infinity, 0]).should.be.exactly(false);
      isValidScale([3, 3]).should.be.exactly(false);
      isValidScale(NaN).should.be.exactly(false);
      isValidScale({min: 0, max: 5}).should.be.exactly(false);
      isValidScale(-4).should.be.exactly(false);
    });
  });
});
