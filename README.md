<span class="badge-npmversion"><a href="https://www.npmjs.com/package/replace-circular-object" title="View this project on NPM"><img src="https://img.shields.io/npm/v/replace-circular-object.svg" alt="NPM version" /></a></span>

## Summary

Retrieve a duplicate of the given object, eliminating any circular references.

This function replaces circular references with a specified default value when the number of circular references exceeds a defined depth limit. Both the default value and depth limit are customizable and optional.

If no default value is specified, an empty object or array will be used.
If no depth limit is specified, the function will replace circular references at the first occurrence with a depth limit of 0.

<i>CommonJS & ESM supported</i>

## Requirements

Node >= 12

## Installation

> npm i replace-circular-object

## Importing

ESM import

```js
import replaceCircularObject from 'replace-circular-object';
```

CommonJS require

```js
const { replaceCircularObject } = require('replace-circular-object');
```

## Usage

```js
const circularObject = {};
circularObject.property = circularObject;

const replacedObject = replaceCircularObject(circularObject, 'Default Value!', 3);

console.log(replacedObject); // { property: { property: { property: 'Default Value!' } } }
```

More examples at [test/index.test.js](test/index.test.js)
