# figify ![stability](https://img.shields.io/badge/stability-experimental-orange.svg)
> [fig.js](http://github.com/nikersify/fig) browserify transform

[![npm](https://img.shields.io/npm/v/figify.svg)](https://www.npmjs.com/package/figify)
[![travis](https://travis-ci.org/nikersify/figify.svg?branch=master)](https://travis-ci.org/nikersify/figify)

# introduction

Unlike some other <sup>ehm... good</sup> frameworks, all components in fig have to be compiled in order for fig.js to digest them correctly. This limitation is posed due to the fact that packing the whole pug library into a browser package is damn non-sensical considering how much it weights by itself (minified or not), increasing the size of fig.js by two orders of magnitude (rough estimate). If you already know how to use browserify, just use `figify` as a transform.

Figify attempts to transform all files you require in your app that end in `.pug` or `.fig` into modules that export a [compiled](https://github.com/nikersify/fig-compiler) fig component.

# usage

## cli

### `browserify <input> -t figify -o <output>`

## api
```js
const browserify = require('browserify')
const figify = require('figify')

const b = browserify('main.js')
b.transform(figify)

b.bundle().pipe(process.stdout)
```

# install

`npm install figify --save`

# license

MIT

# related

- [fig.js](https://github.com/nikersify/fig) - experimental front-end ui framework
- [fig-compiler](https://github.com/nikersify/fig-compiler) - fig.js component compiler
- [fig-web](https://github.com/nikersify/fig-web) - fig.js website
