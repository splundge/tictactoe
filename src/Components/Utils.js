/**
 * for a given count, repeat a function and returns the result
 * @param {*} count
 * @param {*} func
 * @returns
 */
export const repeat = (count, func) => {
	const results = [];
	for (let x = 0; x < count; x++) {
		results.push(func(x));
	}
	return results;
};

/**
 * determines if an object is null or undefined
 * @param {*} object
 * @returns true/false
 */
export const isNullOrUndefined = (object) =>
	object === undefined || object === null;

/**
 * determines if a string is null or empty
 * @param {*} string
 * @returns true/false
 */
export const stringIsNullOrEmpty = (string) =>
	isNullOrUndefined(string) || string.length <= 0;

/**
 * determines if an array is null or empty
 * @param {*} array
 * @returns true/false
 */
export const arrayIsNullOrEmpty = (array) =>
	isNullOrUndefined(array) || array.length <= 0;
