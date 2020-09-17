const sum = (a, b) => a + b;

const farenheitToCelsius = (temp) => (temp - 32) / 1.8;
const celsiusToFarenheit = (temp) => temp * 1.8 + 32;

const multiplyBy2 = (num) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (num <= 0) {
				return reject('Number must not be equal or less than zero');
			}

			resolve(num * 2);
		}, 2000);
	});
};

module.exports = {
	sum,
	multiplyBy2,
	farenheitToCelsius,
	celsiusToFarenheit
};
