const { replaceCircularObject } = require('../dist/index.cjs');
const assert = require('node:assert');

const circularObject = {};
circularObject.property = circularObject;

const circularArray = [];
circularArray.push(circularArray);

const replacedObjectNoDefault = replaceCircularObject(circularObject);
assert.deepEqual(replacedObjectNoDefault, { property: {} });

const replacedObjectWithDefault = replaceCircularObject(circularObject, 'Default Value!', 3);
assert.deepEqual(replacedObjectWithDefault, { property: { property: { property: 'Default Value!' } } });

const replacedArrayNoDefault = replaceCircularObject(circularArray);
assert.deepEqual(replacedArrayNoDefault, [[]]);

const replacedArrayWithDepth = replaceCircularObject(circularArray, undefined, 5);
assert.deepEqual(replacedArrayWithDepth, [[[[[[]]]]]]);

console.log('---------------------------------------------');
console.log('🚀🚀🚀🚀🚀 CommonJS tests passed! 🚀🚀🚀🚀🚀');
console.log('---------------------------------------------');
console.log('');
