/**
 *
 * @param {JSON Object} object1 First object
 * @param {JSON Object} object2 Second object
 * @returns {Boolean} Returns true if both the objects are same
 */
export const compareJsonObjects = (object1, object2) => {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);

	if (keys1.length !== keys2.length) return false;

	for (let key of keys1) {
		console.log('object1[key] is', object1[key]);
		console.log('object2[key] is', object2[key]);
		if (object1[key] !== object2[key]) return false;
	}

	return true;
};
