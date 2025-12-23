/*
Copyright 2016-17 Balena

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * @summary Evaluate a setting property
 * @function
 * @protected
 *
 * @param {Object} [settings={}] - settings
 * @param {String} property - key of settings
 * @returns {*} setting value
 *
 * @throws Will throw if setting is not found.
 *
 * @example
 * console.log(utils.evaluateSetting({ foo: 'bar' }, 'foo'))
 * > 'bar'
 *
 * @example
 * console.log(utils.evaluateSetting({
 * 	foo: {
 * 		bar: 'baz'
 * 	}
 * }, 'foo.bar'))
 * > 'baz'
 *
 * @example
 * console.log(utils.evaluateSetting({
 * 	greeting: 'Hola',
 * 	message: function() {
 * 		return `${this.greeting} World`
 * 	}
 * }), 'message')
 * > Hola World
 */
export const evaluateSetting = <T>(
	settings: Record<string, any>,
	property: string,
): T => {
	let value = settings[property as keyof typeof settings];

	if (value == null) {
		throw new Error(`Setting not found: ${property}`);
	}

	if (typeof value === 'function') {
		// This enables nifty things like dynamic
		// settings that rely on other settings
		value = value.call(settings);
	}

	return value as T;
};
