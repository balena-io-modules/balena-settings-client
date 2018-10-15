"use strict";
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
var hidepath = require("hidepath");
var userHome = require("home-or-tmp");
var path_1 = require("path");
module.exports = {
    /**
     * @property {String} balenaUrl - Balena API url
     * @memberof defaults
     */
    balenaUrl: 'balena-cloud.com',
    /**
     * @property {Function} apiUrl - Balena API url
     * @memberof defaults
     */
    apiUrl: function () {
        return "https://api." + this.balenaUrl;
    },
    /**
     * @property {Function} vpnUrl - Balena VPN url
     * @memberof defaults
     */
    vpnUrl: function () {
        return "vpn." + this.balenaUrl;
    },
    /**
     * @property {Function} registryUrl - Balena Registry url
     * @memberof defaults
     */
    registryUrl: function () {
        return "registry." + this.balenaUrl;
    },
    /**
     * @property {Function} registry2Url - Balena Registry 2 url
     * @memberof defaults
     */
    registry2Url: function () {
        return "registry2." + this.balenaUrl;
    },
    /**
     * @property {Function} imageMakerUrl - Balena Image Maker url
     * @memberof defaults
     */
    imageMakerUrl: function () {
        return "https://img." + this.balenaUrl;
    },
    /**
     * @property {Function} deltaUrl - Balena Delta url
     * @memberof defaults
     */
    deltaUrl: function () {
        return "https://delta." + this.balenaUrl;
    },
    /**
     * @property {Function} dashboardUrl - Balena dashboard url
     * @memberof defaults
     */
    dashboardUrl: function () {
        return "https://dashboard." + this.balenaUrl;
    },
    /**
     * @property {Function} proxyUrl - Balena Proxy url
     * @memberof defaults
     */
    proxyUrl: function () {
        if (this.balenaUrl === 'balena-cloud.com') {
            return 'balena-devices.com';
        }
        else if (this.balenaUrl === 'balena-staging.com') {
            return 'balena-staging-devices.com';
        }
        return "devices." + this.balenaUrl;
    },
    /**
     * @property {String} dataDirectory - data directory path
     * @memberof defaults
     */
    dataDirectory: path_1.join(userHome, hidepath('balena')),
    /**
     * @property {String} projectsDirectory - projects directory path
     * @memberof defaults
     */
    projectsDirectory: path_1.join(userHome, 'BalenaProjects'),
    /**
     * @property {Function} cacheDirectory - cache directory path
     * @memberof defaults
     */
    cacheDirectory: function () {
        return path_1.join(this.dataDirectory, 'cache');
    },
    /**
     * @property {Function} binDirectory - binary directory path
     * @memberof defaults
     */
    binDirectory: function () {
        return path_1.join(this.dataDirectory, 'bin');
    },
    /**
     * @property {Number} imageCacheTime - image cache time
     * @memberof defaults
     */
    imageCacheTime: 1 * 1000 * 60 * 60 * 24 * 7,
    /**
     * @property {Number} tokenRefreshInterval - token refresh interval
     * @memberof defaults
     */
    tokenRefreshInterval: 1 * 1000 * 60 * 60,
    /**
     * @property {String} apiKeyVariable - api key environment variable
     * @memberof defaults
     */
    apiKeyVariable: 'BALENA_API_KEY'
};
//# sourceMappingURL=defaults.js.map