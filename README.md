## Summary

Retrieve a duplicate of the given object, eliminating any circular references.

This function replaces circular references with a specified default value when the number of circular references exceeds a defined depth limit. Both the default value and depth limit are customizable and optional.

If no default value is specified, an empty object or array will be used.
If no depth limit is specified, the function will replace circular references at the first occurrence with a depth limit of 0.

> CommonJS & ESM supported

## Installation

> npm i replace-circular-object

## Usage

```js
import replaceCircularObject from 'replace-circular-object';

const circularObject = {};
circularObject.property = circularObject;

const replacedObject = replaceCircularObject(circularObject, 'Default Value!', 3);

console.log(replacedObject); // { property: { property: { property: 'Default Value!' } } }
```

More examples at [test/test.js](test/test.js)
