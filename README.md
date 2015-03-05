# rescale-util

[![Build Status](https://travis-ci.org/javiercejudo/rescale-util.svg)](https://travis-ci.org/javiercejudo/rescale-util)

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
```

See [spec](test/spec.js).
