balena-settings-client
---------------------

[![npm version](https://badge.fury.io/js/balena-settings-client.svg)](http://badge.fury.io/js/balena-settings-client)
[![dependencies](https://david-dm.org/balena-io-modules/balena-settings-client.png)](https://david-dm.org/balena-io-modules/balena-settings-client.png)
[![Build Status](https://travis-ci.org/balena-io-modules/balena-settings-client.svg?branch=master)](https://travis-ci.org/balena-io-modules/balena-settings-client)
[![Build status](https://ci.appveyor.com/api/projects/status/a1tfwovw1kp421sa?svg=true)](https://ci.appveyor.com/project/jviotti/balena-settings-client)

Join our online chat at [![Gitter chat](https://badges.gitter.im/balena-io/chat.png)](https://gitter.im/balena-io/chat)

Balena client application shared settings.

Role
----

The intention of this module is to provice low level access to user configurable balena simple settings.

**THIS MODULE IS LOW LEVEL AND IS NOT MEANT TO BE USED BY END USERS DIRECTLY**.

Unless you know what you're doing, use the [balena SDK](https://github.com/balena-io/balena-sdk) instead.

Installation
------------

Install `balena-settings-client` by running:

```sh
$ npm install --save balena-settings-client
```

Documentation
-------------

This module attempts to retrieve configuration from the following places:

**UNIX:**

- Default settings.
- `$HOME/.balenarc.yml`.
- `$PWD/balenarc.yml`.
- Environment variables matching `BALENARC_<SETTING_NAME>`.

**Windows:**

- Default settings.
- `%UserProfile%\_balenarc.yml`.
- `%cd%\balenarc.yml`.
- Environment variables matching `BALENARC_<SETTING_NAME>`.

The values from all locations are merged together, with sources listed below taking precedence.

For example:

```sh
	$ cat $HOME/.balenarc.yml
	balenaUrl: 'balena-staging.com'
	projectsDirectory: '/opt/balena'

	$ cat $PWD/.balenarc.yml
	projectsDirectory: '/Users/balena/Projects'
	dataDirectory: '/opt/balena-data'

	$ echo $BALENARC_DATA_DIRECTORY
	/opt/cache/balena
```

That specific environment will have the following configuration:

```yaml
	balenaUrl: 'balena-staging.com'
	projectsDirectory: '/Users/balena/Projects'
	dataDirectory: '/opt/cache/balena'
```


* [settings](#module_settings)
    * [.get(name)](#module_settings.get) ⇒ <code>\*</code>
    * [.getAll()](#module_settings.getAll) ⇒ <code>Object</code>

<a name="module_settings.get"></a>

### settings.get(name) ⇒ <code>\*</code>
**Kind**: static method of [<code>settings</code>](#module_settings)  
**Summary**: Get a setting  
**Returns**: <code>\*</code> - setting value  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | setting name |

**Example**  
```js
settings.get('dataDirectory')
```
<a name="module_settings.getAll"></a>

### settings.getAll() ⇒ <code>Object</code>
**Kind**: static method of [<code>settings</code>](#module_settings)  
**Summary**: Get all settings  
**Returns**: <code>Object</code> - all settings  
**Access**: public  
**Example**  
```js
settings.getAll()
```

Modifying settings
------------------

This module is intended to only provide *read only* access to the settings. Balena settings client reads settings from various locations, like a local `balenarc` file and a per user `config` file, therefore the module doesn't know where to write changes back.

If you want to persist data related to balena, consider using [balena settings storage](https://github.com/balena-io-modules/balena-settings-storage) instead.

Support
-------

If you're having any problem, please [raise an issue](https://github.com/balena-io-modules/balena-settings-client/issues/new) on GitHub and the balena team will be happy to help.

Tests
-----

Run the test suite by doing:

```sh
$ npm test
```

Contribute
----------

- Issue Tracker: [github.com/balena-io-modules/balena-settings-client/issues](https://github.com/balena-io-modules/balena-settings-client/issues)
- Source Code: [github.com/balena-io-modules/balena-settings-client](https://github.com/balena-io-modules/balena-settings-client)

Before submitting a PR, please make sure that you include tests, and that [coffeelint](http://www.coffeelint.org/) runs without any warning:

```sh
$ npm run lint
```

License
-------

The project is licensed under the Apache 2.0 license.
