resin-settings-client
---------------------

[![npm version](https://badge.fury.io/js/resin-settings-client.svg)](http://badge.fury.io/js/resin-settings-client)
[![dependencies](https://david-dm.org/resin-io/resin-settings-client.png)](https://david-dm.org/resin-io/resin-settings-client.png)
[![Build Status](https://travis-ci.org/resin-io/resin-settings-client.svg?branch=master)](https://travis-ci.org/resin-io/resin-settings-client)
[![Build status](https://ci.appveyor.com/api/projects/status/a1tfwovw1kp421sa?svg=true)](https://ci.appveyor.com/project/jviotti/resin-settings-client)

Resin.io client application shared settings.

Role
----

The intention of this module is to provice low level access to user configurable Resin.io simple settings.

**THIS MODULE IS LOW LEVEL AND IS NOT MEANT TO BE USED BY END USERS DIRECTLY**.

Unless you know what you're doing, use the [Resin SDK](https://github.com/resin-io/resin-sdk) instead.

Installation
------------

Install `resin-settings-client` by running:

```sh
$ npm install --save resin-settings-client
```

Documentation
-------------

The following settings are documented:

- `remoteUrl`: The default Resin.io server url.
- `dashboardUrl`: The default Resin.io dashboard url.
- `dataDirectory`: The default per user data directory path.

Notice that Resin Settings Client reads `$HOME/.resin/config` and `$PWD/.resinconf` to customise it's per user and per application values.

<a name="module_settings..get"></a>
### settings~get([name]) ⇒ <code>\*</code>
This function returns an object containing all settings if you don't pass a setting name.

**Kind**: inner method of <code>[settings](#module_settings)</code>  
**Summary**: Get a settings value  
**Returns**: <code>\*</code> - setting value  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>String</code> | setting name |

**Example**  
```js
remoteUrl = settings.get('remoteUrl')
```
**Example**  
```js
allSettings = settings.get()
```

Support
-------

If you're having any problem, please [raise an issue](https://github.com/resin-io/resin-settings-client/issues/new) on GitHub and the Resin.io team will be happy to help.

Tests
-----

Run the test suite by doing:

```sh
$ gulp test
```

Contribute
----------

- Issue Tracker: [github.com/resin-io/resin-settings-client/issues](https://github.com/resin-io/resin-settings-client/issues)
- Source Code: [github.com/resin-io/resin-settings-client](https://github.com/resin-io/resin-settings-client)

Before submitting a PR, please make sure that you include tests, and that [coffeelint](http://www.coffeelint.org/) runs without any warning:

```sh
$ gulp lint
```

License
-------

The project is licensed under the MIT license.
