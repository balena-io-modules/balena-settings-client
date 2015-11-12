
/*
The MIT License

Copyright (c) 2015 Resin.io, Inc. https://resin.io.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */
var path, userHome, utils;

path = require('path');

userHome = require('home-or-tmp');

utils = require('./utils');


/**
 * @summary Default settings
 * @namespace defaults
 * @protected
 */

module.exports = {

  /**
  	 * @property {String} resinUrl - Resin.io url
  	 * @memberof defaults
   */
  resinUrl: 'resin.io',

  /**
  	 * @property {Function} apiUrl - Resin.io API url
  	 * @memberof defaults
   */
  apiUrl: function() {
    return "https://api." + this.resinUrl;
  },

  /**
  	 * @property {Function} vpnUrl - Resin.io VPN url
  	 * @memberof defaults
   */
  vpnUrl: function() {
    return "vpn." + this.resinUrl;
  },

  /**
  	 * @property {Function} registryUrl - Resin.io Registry url
  	 * @memberof defaults
   */
  registryUrl: function() {
    return "registry." + this.resinUrl;
  },

  /**
  	 * @property {Function} dashboardUrl - Resin.io dashboard url
  	 * @memberof defaults
   */
  dashboardUrl: function() {
    return "https://dashboard." + this.resinUrl;
  },

  /**
  	 * @property {String} dataDirectory - data directory path
  	 * @memberof defaults
   */
  dataDirectory: path.join(userHome, utils.addHiddenPathPrefix('resin')),

  /**
  	 * @property {String} projectsDirectory - projects directory path
  	 * @memberof defaults
   */
  projectsDirectory: path.join(userHome, 'ResinProjects'),

  /**
  	 * @property {Function} cacheDirectory - cache directory path
  	 * @memberof defaults
   */
  cacheDirectory: function() {
    return path.join(this.dataDirectory, 'cache');
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
  apiKeyVariable: 'RESIN_API_KEY'
};
