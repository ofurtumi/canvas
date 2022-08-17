const EPSILON = 0.00000001;

const areEqual = (one, other, epsilon = EPSILON) =>
	Math.abs(one - other) < epsilon;

const toDegrees = (radians) => (radians * 180) / Math.PI;
const toRadians = (degrees) => (degrees * Math.PI) / 180;
const sum = (arr) => arr.reduce((acc, value) => acc + value, 0);
const withoutElementAtIndex = (arr, index) => [
	...arr.slice(0, index),
	...arr.slice(index + 1),
];

export { areEqual, toDegrees, toRadians, sum, withoutElementAtIndex };
