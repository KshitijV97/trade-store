/**
 * 
 * @param {Function} callback Function to be debounced
 * @param {number} delay Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = function (callback, delay) {
	let timer;
	return function () {
		let context = this;
		let args = arguments;
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(context, args);
		}, delay);
	};
};
