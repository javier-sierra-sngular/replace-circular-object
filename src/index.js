'use strict';

class CircularReferenceReplacer {
	#depthLimit;
	#defaultValue;
	/**
	 * @param {*} defaultValue - The default value to use for replacing circular references.
	 * @param {number} depthLimit - The maximum number of circular references allowed before using the default value.
	 */
	constructor(defaultValue, depthLimit) {
		this.#depthLimit = depthLimit;
		this.#defaultValue = defaultValue;
	}

	replace(obj) {
		return this.#replaceRecursively(obj, []);
	}

	#replaceRecursively(obj, ancestors) {
		if (!this.#isJSONObjectOrArray(obj)) {
			return obj;
		}
		if (this.#hasCircularReferences(obj, ancestors) && this.#exceedsDepthLimit(obj, ancestors)) {
			return this.#getDefaultValue(obj);
		}
		return this.#doReplace(obj, ancestors);
	}

	#doReplace(obj, ancestors) {
		ancestors.push(obj); // push the original reference
		obj = Array.isArray(obj) ? [...obj] : { ...obj }; // copy
		for (const key of Object.keys(obj)) {
			obj[key] = this.#replaceRecursively(
				obj[key],
				[...ancestors] // copy of ancestors avoiding mutation by siblings
			);
		}
		return obj;
	}

	#hasCircularReferences(obj, ancestors) {
		const hasCircularReferences = ancestors.includes(obj);
		return hasCircularReferences;
	}

	#exceedsDepthLimit(obj, ancestors) {
		const exceedsCircularReferencesLimit = this.#countOccurrences(obj, ancestors) >= this.#depthLimit;
		return exceedsCircularReferencesLimit;
	}

	#countOccurrences(value, array) {
		const count = array.reduce(
			(accumulator, currentValue) => (currentValue === value ? accumulator + 1 : accumulator),
			0
		);
		return count;
	}

	#isJSONObjectOrArray(obj) {
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

	#getDefaultValue(obj) {
		if (this.#defaultValue === undefined) {
			return Array.isArray(obj) ? [] : {};
		}
		return this.#defaultValue;
	}
}

/**
 * Retrieve a duplicate of the given object, eliminating any circular references.
 * Replaces circular references with a default value if the number of circular references exceeds the depth limit.
 * @function
 * @param {Object} obj - The object to replace circular references in.
 * @param {*} [defaultValue] - The default value to use for replacing circular references. If no one is provided, the default value is the empty object or array.
 * @param {number} [depthLimit = 0] - The maximum number of circular references allowed before using the default value.
 * @returns {Object} - The object without circular references.
 */
export function replaceCircularObject(obj, defaultValue, depthLimit = 0) {
	const circularReferenceReplacer = new CircularReferenceReplacer(defaultValue, depthLimit);
	const objWithoutCircularReferences = circularReferenceReplacer.replace(obj);
	return objWithoutCircularReferences;
}

export default replaceCircularObject;
