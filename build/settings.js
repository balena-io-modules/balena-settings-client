
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

/**
 * @module settings
 */
var ConfJS, path, settings, userHome;

ConfJS = require('conf.js');

path = require('path');

userHome = require('user-home');

settings = {
  remoteUrl: 'https://api.resin.io',
  dashboardUrl: 'https://dashboard.resin.io',
  dataDirectory: path.join(userHome, '.resin'),
  imageCacheTime: 1 * 1000 * 60 * 60 * 24 * 7,
  tokenRefreshInterval: 1 * 1000 * 60 * 60,
  projectsDirectory: path.join(userHome, 'ResinProjects')
};

settings.cacheDirectory = path.join(settings.dataDirectory, 'cache');

module.exports = new ConfJS({
  userConfig: path.join(settings.dataDirectory, 'config'),
  localConfig: '.resinconf',
  "default": settings
});


/**
 * @summary Get a settings value
 * @function get
 * @public
 *
 * @description
 * This function returns an object containing all settings if you don't pass a setting name.
 *
 * @param {String} [name] - setting name
 * @returns {*} setting value
 *
 * @example
 * remoteUrl = settings.get('remoteUrl')
 *
 * @example
 * allSettings = settings.get()
 */
