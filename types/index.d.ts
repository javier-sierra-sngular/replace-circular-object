/**
 * Retrieve a duplicate of the given object, eliminating any circular references.
 * Replaces circular references with a default value if the number of circular references exceeds the depth limit.
 * @function
 * @param {*} obj - The object to replace circular references in.
 * @param {*} [defaultValue] - The default value to use for replacing circular references. If no one is provided, the default value is the empty object or array.
 * @param {number} [depthLimit = 0] - The maximum number of circular references allowed before using the default value.
 * @returns {*} - The object without circular references.
 */
declare function replaceCircularObject(obj: Object, defaultValue?: any, depthLimit?: number): Object;
export default replaceCircularObject;
