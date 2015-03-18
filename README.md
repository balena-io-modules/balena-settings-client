resin-settings-client
---------------------

[![npm version](https://badge.fury.io/js/resin-settings-client.svg)](http://badge.fury.io/js/resin-settings-client)
[![dependencies](https://david-dm.org/resin-io/resin-settings-client.png)](https://david-dm.org/resin-io/resin-settings-client.png)
[![Build Status](https://travis-ci.org/resin-io/resin-settings-client.svg?branch=master)](https://travis-ci.org/resin-io/resin-settings-client)

Resin.io client application shared settings.

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
- `dataDirectory`: The default per user data directory path.

You can use `settings.get(<setting name>)` to get their values.

Notice that Resin Settings Client reads `$HOME/.resin/config` and `$PWD/.resinconf` to customise it's per user and per application values.

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

Support
-------

If you're having any problem, please [raise an issue](https://github.com/resin-io/resin-settings-client/issues/new) on GitHub.

License
-------

The project is licensed under the MIT license.
