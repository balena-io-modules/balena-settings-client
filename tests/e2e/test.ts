import * as Promise from 'bluebird';
import * as childProcess from 'child_process';
import { stripIndent } from 'common-tags';
import * as fs from 'fs';
import * as _ from 'lodash';
import { expect, use } from 'chai';
import * as path from 'path';
import * as wary from 'wary';
import * as chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

import config = require('../../lib/config');

const execAsync = Promise.promisify<[string, string], string, any>(
	childProcess.exec,
	{ multiArgs: true },
);

const handleExecResult = (stdout: string, stderr: string) => {
	if (!_.isEmpty(stderr)) {
		throw new Error(stderr);
	}
	return stdout.replace(/\n$/, '');
};

const getSetting = (setting: string) => {
	const script = path.join(__dirname, 'get.ts');
	return execAsync(`ts-node ${script} ${setting}`, { encoding: 'utf8' }).spread(
		handleExecResult,
	);
};

const getAll = () => {
	const script = path.join(__dirname, 'get-all.ts');
	return execAsync(`ts-node ${script}`, { encoding: 'utf8' })
		.spread(handleExecResult)
		.then(JSON.parse);
};

wary.it(
	'should override defaults given a legacy resin configuration',
	{},
	() => {
		fs.writeFileSync(
			config.paths.user.replace('balenarc.yml', 'resinrc.yml'),
			stripIndent`
				resinUrl: resin.io
			`,
		);
		return Promise.props({
			balenaUrl: getSetting('balenaUrl'),
			apiUrl: getSetting('apiUrl'),
			dashboardUrl: getSetting('dashboardUrl'),
			vpnUrl: getSetting('vpnUrl'),
			registryUrl: getSetting('registryUrl'),
			registry2Url: getSetting('registry2Url'),
			proxyUrl: getSetting('proxyUrl'),
		}).then((settings) => {
			expect(settings.balenaUrl).to.equal('resin.io');
			expect(settings.apiUrl).to.equal('https://api.resin.io');
			expect(settings.dashboardUrl).to.equal('https://dashboard.resin.io');
			expect(settings.vpnUrl).to.equal('vpn.resin.io');
			expect(settings.registryUrl).to.equal('registry.resin.io');
			expect(settings.registry2Url).to.equal('registry2.resin.io');
			expect(settings.proxyUrl).to.equal('resindevice.io');
		});
	},
);

wary.it(
	'should override defaults and resin configuration given a user balena configuration that points to staging',
	{},
	() => {
		fs.writeFileSync(
			config.paths.user,
			stripIndent`
				balenaUrl: balena-staging.com
			`,
		);
		return Promise.props({
			balenaUrl: getSetting('balenaUrl'),
			apiUrl: getSetting('apiUrl'),
			dashboardUrl: getSetting('dashboardUrl'),
			vpnUrl: getSetting('vpnUrl'),
			registryUrl: getSetting('registryUrl'),
			registry2Url: getSetting('registry2Url'),
			proxyUrl: getSetting('proxyUrl'),
		}).then((settings) => {
			expect(settings.balenaUrl).to.equal('balena-staging.com');
			expect(settings.apiUrl).to.equal('https://api.balena-staging.com');
			expect(settings.dashboardUrl).to.equal(
				'https://dashboard.balena-staging.com',
			);
			expect(settings.vpnUrl).to.equal('vpn.balena-staging.com');
			expect(settings.registryUrl).to.equal('registry.balena-staging.com');
			expect(settings.registry2Url).to.equal('registry2.balena-staging.com');
			expect(settings.proxyUrl).to.equal('balena-staging-devices.com');
		});
	},
);

wary.it('should give precedence to project configuration', {}, () => {
	fs.writeFileSync(
		config.paths.user,
		stripIndent`
			balenaUrl: balena-staging.com/
		`,
	);
	fs.writeFileSync(
		config.paths.project,
		stripIndent`
			balenaUrl: balena.custom.com/
		`,
	);
	return Promise.props({
		balenaUrl: getSetting('balenaUrl'),
		apiUrl: getSetting('apiUrl'),
		dashboardUrl: getSetting('dashboardUrl'),
		vpnUrl: getSetting('vpnUrl'),
		registryUrl: getSetting('registryUrl'),
		registry2Url: getSetting('registry2Url'),
		proxyUrl: getSetting('proxyUrl'),
	}).then((settings) => {
		expect(settings.balenaUrl).to.equal('balena.custom.com/');
		expect(settings.apiUrl).to.equal('https://api.balena.custom.com/');
		expect(settings.dashboardUrl).to.equal(
			'https://dashboard.balena.custom.com/',
		);
		expect(settings.vpnUrl).to.equal('vpn.balena.custom.com/');
		expect(settings.registryUrl).to.equal('registry.balena.custom.com/');
		expect(settings.registry2Url).to.equal('registry2.balena.custom.com/');
		expect(settings.proxyUrl).to.equal('devices.balena.custom.com/');
	});
});

wary.it(
	'should give precedence to environment variable configuration',
	{},
	() => {
		fs.writeFileSync(
			config.paths.user,
			stripIndent`
				balenaUrl: balena-staging.com/
			`,
		);
		fs.writeFileSync(
			config.paths.project,
			stripIndent`
				balenaUrl: balena.custom.com/
			`,
		);
		process.env.BALENARC_BALENA_URL = 'balenadev.custom.com/';

		return expect(getSetting('balenaUrl')).to.eventually.equal(
			'balenadev.custom.com/',
		);
	},
);

wary.it('should be able to return all settings', {}, () => {
	process.env.BALENARC_PROJECTS_DIRECTORY = '/usr/src/projects';
	process.env.BALENARC_DATA_DIRECTORY = '/opt';

	return expect(getAll()).to.eventually.deep.equal({
		balenaUrl: 'balenadev.custom.com/',
		apiUrl: 'https://api.balenadev.custom.com/',
		vpnUrl: 'vpn.balenadev.custom.com/',
		registryUrl: 'registry.balenadev.custom.com/',
		registry2Url: 'registry2.balenadev.custom.com/',
		deltaUrl: 'https://delta.balenadev.custom.com/',
		dashboardUrl: 'https://dashboard.balenadev.custom.com/',
		proxyUrl: 'devices.balenadev.custom.com/',
		tunnelUrl: 'tunnel.balenadev.custom.com/',
		dataDirectory: '/opt',
		cacheDirectory: path.join('/opt', 'cache'),
		binDirectory: path.join('/opt', 'bin'),
		projectsDirectory: '/usr/src/projects',
		imageCacheTime: 604800000,
		tokenRefreshInterval: 3600000,
		apiKeyVariable: 'BALENA_API_KEY',
	});
});

wary.it('should be rejected if the config file is malformed', {}, () => {
	fs.writeFileSync(
		config.paths.project,
		stripIndent`
			balenaUrl=balena.custom.com/
		`,
	);

	return expect(getAll()).to.be.rejectedWith('Error parsing config file');
});

wary
	.run()
	.catch((error) => {
		console.error(`ERROR: ${error.message}`, error.stack);
		process.exit(1);
	})
	.finally(() => {
		try {
			fs.unlinkSync(config.paths.user);
			fs.unlinkSync(config.paths.project);
		} catch (error) {
			// do nothing
		}
	});
