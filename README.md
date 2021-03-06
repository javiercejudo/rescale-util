# rescale-util

[![Build Status](https://travis-ci.org/javiercejudo/rescale-util.svg)](https://travis-ci.org/javiercejudo/rescale-util)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/rescale-util/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/rescale-util?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/rescale-util/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/rescale-util)

Rescale utilities

## Install

    npm i rescale-util

## Usage

```js
var rescaleUtil = require('rescale-util');

rescaleUtil.isValidScale([-3, 5]); // => true
rescaleUtil.isValidScale([0, 0]); // => false
rescaleUtil.getLastError(); // => the extremes cannot be the same. Eg. [0, 1]

rescaleUtil.resetLastError();
rescaleUtil.getLastError(); // => '' (empty string)

rescaleUtil.isValidPreset([[-3, 5], [1, 0]]); // => true
rescaleUtil.isValidPreset(10); // => false
rescaleUtil.getLastError(); // => a preset must be an Array with two scales. Eg. [[0, 100], [32, 212]]

rescaleUtil.areValidPresets([[[Math.PI, 0], [Math.E, 5]], [[0, 100], [32, 212]]]); // => true
rescaleUtil.areValidPresets(10); // => false
rescaleUtil.getLastError(); // => presets must be an Array with presets. Eg. [[[0, 100], [32, 212]], [[0, 100], [-273.15, -173.15]]]
```

Rescale-util also provides a specific error:

```js
var rescaleUtil = require('rescale-util');
var RescaleError = rescaleUtil.RescaleError;

if (!rescaleUtil.isValidScale(someScale)) {
  throw new RescaleError(rescaleUtil.getLastError());
}
```

See [spec](test/spec.js).

## Related projects

- [linear-converter](https://github.com/javiercejudo/linear-converter): flexible linear converter with built in conversions for common units.
- [rescale](https://github.com/javiercejudo/rescale): rescales a point given two scales.
- [scale](https://github.com/javiercejudo/scale): scales normalised data.
- [normalise](https://github.com/javiercejudo/normalise): normalise data to [0, 1].
