import replaceCircularObject from '../index.cjs';
import assert from 'node:assert';

const circularObject = {};
circularObject.property = circularObject;

const circularArray = [];
circularArray.push(circularArray);

const replacedObjectNoDefault = replaceCircularObject(circularObject);
assert.deepEqual(replacedObjectNoDefault, { property: {} });

const replacedObjectWithDefault = replaceCircularObject(circularObject, 'Default Value!', 3);
assert.deepEqual(replacedObjectWithDefault, { property: { property: { property: 'Default Value!' } } });

const replacedArray = replaceCircularObject(circularArray);
assert.deepEqual(replacedArray, [[]]);

const replacedArrayWithDepth = replaceCircularObject(circularArray, undefined, 5);
assert.deepEqual(replacedArrayWithDepth, [[[[[[]]]]]]);

console.log('🚀🚀🚀🚀🚀 Tests passed! 🚀🚀🚀🚀🚀');
