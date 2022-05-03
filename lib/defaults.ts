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

import * as hidepath from 'hidepath';
import * as userHome from 'home-or-tmp';
import { join as joinPath } from 'path';

/**
 * @summary Default settings
 * @namespace defaults
 * @protected
 */
export = {
	/**
	 * @property {String} balenaUrl - Balena API url
	 * @memberof defaults
	 */
	balenaUrl: 'balena-cloud.com',

	/**
	 * @property {Function} apiUrl - Balena API url
	 * @memberof defaults
	 */
	apiUrl() {
		return `https://api.${this.balenaUrl}`;
	},

	/**
	 * @property {Function} vpnUrl - Balena VPN url
	 * @memberof defaults
	 */
	vpnUrl() {
		return `vpn.${this.balenaUrl}`;
	},

	/**
	 * @property {Function} registryUrl - Balena Registry url
	 * @memberof defaults
	 */
	registryUrl() {
		return `registry.${this.balenaUrl}`;
	},

	/**
	 * @property {Function} registry2Url - Balena Registry 2 url
	 * @memberof defaults
	 */
	registry2Url() {
		return `registry2.${this.balenaUrl}`;
	},

	/**
	 * @property {Function} deltaUrl - Balena Delta url
	 * @memberof defaults
	 */
	deltaUrl() {
		return `https://delta.${this.balenaUrl}`;
	},

	/**
	 * @property {Function} dashboardUrl - Balena dashboard url
	 * @memberof defaults
	 */
	dashboardUrl() {
		return `https://dashboard.${this.balenaUrl}`;
	},

	/**
	 * @property {Function} proxyUrl - Balena Proxy url
	 * @memberof defaults
	 */
	proxyUrl() {
		if (this.balenaUrl === 'balena-cloud.com') {
			return 'balena-devices.com';
		} else if (this.balenaUrl === 'balena-staging.com') {
			return 'balena-staging-devices.com';
		} else if (this.balenaUrl === 'resin.io') {
			return 'resindevice.io';
		}
		return `devices.${this.balenaUrl}`;
	},

	/**
	 * @property {Function} tunnelUrl - Balena Tunnel url
	 * @memberof defaults
	 */
	tunnelUrl() {
		return `tunnel.${this.balenaUrl}`;
	},

	/**
	 * @property {String} dataDirectory - data directory path
	 * @memberof defaults
	 */
	dataDirectory: joinPath(userHome, hidepath('balena')),

	/**
	 * @property {String} projectsDirectory - projects directory path
	 * @memberof defaults
	 */
	projectsDirectory: joinPath(userHome, 'BalenaProjects'),

	/**
	 * @property {Function} cacheDirectory - cache directory path
	 * @memberof defaults
	 */
	cacheDirectory() {
		return joinPath(this.dataDirectory, 'cache');
	},

	/**
	 * @property {Function} binDirectory - binary directory path
	 * @memberof defaults
	 */
	binDirectory() {
		return joinPath(this.dataDirectory, 'bin');
	},

	/**
	 * @property {Number} imageCacheTime - image cache time
	 * @memberof defaults
	 */
	imageCacheTime: 1 * 1000 * 60 * 60 * 24 * 7, // 1 week in milliseconds

	/**
	 * @property {Number} tokenRefreshInterval - token refresh interval
	 * @memberof defaults
	 */
	tokenRefreshInterval: 1 * 1000 * 60 * 60, // 1 hour in milliseconds

	/**
	 * @property {String} apiKeyVariable - api key environment variable
	 * @memberof defaults
	 */
	apiKeyVariable: 'BALENA_API_KEY',
};
