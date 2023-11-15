'use strict';

class CircularReferenceReplacer {
	/**
	 * @param {*} defaultValue - The default value to use for replacing circular references.
	 * @param {number} depthLimit - The maximum number of circular references allowed before using the default value.
	 */
	constructor(defaultValue, depthLimit) {
		this._depthLimit = depthLimit;
		this._defaultValue = defaultValue;
	}

	replace(obj) {
		return this._replaceRecursively(obj, []);
	}

	_replaceRecursively(obj, ancestors) {
		if (!this._isJSONObjectOrArray(obj)) {
			return obj;
		}
		if (this._hasCircularReferences(obj, ancestors) && this._exceedsDepthLimit(obj, ancestors)) {
			return this._getDefaultValue(obj);
		}
		return this._doReplace(obj, ancestors);
	}

	_doReplace(obj, ancestors) {
		ancestors.push(obj); // push the original reference
		obj = Array.isArray(obj) ? [...obj] : { ...obj }; // copy
		for (const key of Object.keys(obj)) {
			obj[key] = this._replaceRecursively(
				obj[key],
				[...ancestors] // copy of ancestors avoiding mutation by siblings
			);
		}
		return obj;
	}

	_hasCircularReferences(obj, ancestors) {
		const hasCircularReferences = ancestors.includes(obj);
		return hasCircularReferences;
	}

	_exceedsDepthLimit(obj, ancestors) {
		const exceedsCircularReferencesLimit = this._countOccurrences(obj, ancestors) >= this._depthLimit;
		return exceedsCircularReferencesLimit;
	}

	_countOccurrences(value, array) {
		const count = array.reduce(
			(accumulator, currentValue) => (currentValue === value ? accumulator + 1 : accumulator),
			0
		);
		return count;
	}

	_isJSONObjectOrArray(obj) {
		return (
			typeof obj === 'object' &&
			obj !== null &&
			!(obj instanceof Boolean) &&
			!(obj instanceof Date) &&
			!(obj instanceof Number) &&
			!(obj instanceof RegExp) &&
			!(obj instanceof String)
		);
	}

	_getDefaultValue(obj) {
		if (this._defaultValue === undefined) {
			return Array.isArray(obj) ? [] : {};
		}
		return this._defaultValue;
	}
}

/**
 * Retrieve a duplicate of the given object, eliminating any circular references.
 * Replaces circular references with a default value if the number of circular references exceeds the depth limit.
 * @function
 * @param {*} obj - The object to replace circular references in.
 * @param {*} [defaultValue] - The default value to use for replacing circular references. If no one is provided, the default value is the empty object or array.
 * @param {number} [depthLimit = 0] - The maximum number of circular references allowed before using the default value.
 * @returns {*} - The object without circular references.
 */
function replaceCircularObject(obj, defaultValue, depthLimit = 0) {
	const circularReferenceReplacer = new CircularReferenceReplacer(defaultValue, depthLimit);
	const objWithoutCircularReferences = circularReferenceReplacer.replace(obj);
	return objWithoutCircularReferences;
}

export default replaceCircularObject;
