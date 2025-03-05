export const sum = (a, b) => a + b;

export const farenheitToCelsius = (temp) => (temp - 32) / 1.8;
export const celsiusToFarenheit = (temp) => temp * 1.8 + 32;

export const multiplyBy2 = (num) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (num <= 0) {
				return reject("Number must not be equal or less than zero");
			}

			resolve(num * 2);
		}, 2000);
	});
};
