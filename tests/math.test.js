const {
	sum,
	multiplyBy2,
	farenheitToCelsius,
	celsiusToFarenheit
} = require('./../src/math');

test('adds 2 + 4 equal to 6', () => {
	expect(sum(2, 4)).toBe(6);
});

test('should convert 32 F to 0 C', () => {
	expect(farenheitToCelsius(40)).toBe(4.444444444444445);
});

test('should convert 0 C to 32 F', () => {
	expect(celsiusToFarenheit(40)).toBe(104);
});

test('should multiply by 2', (done) => {
	multiplyBy2(2).then((result) => {
		expect(result).toBe(4);
		done();
	});
});

test('should multiply by 2 using async/await', async () => {
	const result = await multiplyBy2(1);
	expect(result).toBe(2);
});
