import { stripIndent } from 'common-tags';
import * as fs from 'fs';
import { expect, use } from 'chai';
import * as path from 'path';
import * as wary from 'wary';
import * as chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

import config = require('../../lib/config');
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

const handleExecResult = (stdout: string, stderr: string) => {
	if (stderr.length > 0) {
		throw new Error(stderr);
	}
	return stdout.replace(/\n$/, '');
};

const getSetting = (setting: string) => {
	const script = path.join(__dirname, 'get.ts');
	return execAsync(`ts-node ${script} ${setting}`, { encoding: 'utf8' }).then(
		({ stdout, stderr }) => {
			return handleExecResult(stdout, stderr);
		},
	);
};

const getAll = () => {
	const script = path.join(__dirname, 'get-all.ts');
	return execAsync(`ts-node ${script}`, { encoding: 'utf8' })
		.then(({ stdout, stderr }) => {
			return handleExecResult(stdout, stderr);
		})
		.then(JSON.parse);
};

wary.it(
	'should override defaults given a legacy resin configuration',
	{},
	async () => {
		fs.writeFileSync(
			config.paths.user.replace('balenarc.yml', 'resinrc.yml'),
			stripIndent`
				resinUrl: resin.io
			`,
		);
		const balenaUrl = await getSetting('balenaUrl');
		expect(balenaUrl).to.equal('resin.io');
		const apiUrl = await getSetting('apiUrl');
		expect(apiUrl).to.equal('https://api.resin.io');
		const dashboardUrl = await getSetting('dashboardUrl');
		expect(dashboardUrl).to.equal('https://dashboard.resin.io');
		const vpnUrl = await getSetting('vpnUrl');
		expect(vpnUrl).to.equal('vpn.resin.io');
		const registryUrl = await getSetting('registryUrl');
		expect(registryUrl).to.equal('registry.resin.io');
		const registry2Url = await getSetting('registry2Url');
		expect(registry2Url).to.equal('registry2.resin.io');
		const proxyUrl = await getSetting('proxyUrl');
		expect(proxyUrl).to.equal('resindevice.io');
	},
);

wary.it(
	'should override defaults and resin configuration given a user balena configuration that points to staging',
	{},
	async () => {
		fs.writeFileSync(
			config.paths.user,
			stripIndent`
				balenaUrl: balena-staging.com
			`,
		);
		const balenaUrl = await getSetting('balenaUrl');
		expect(balenaUrl).to.equal('balena-staging.com');
		const apiUrl = await getSetting('apiUrl');
		expect(apiUrl).to.equal('https://api.balena-staging.com');
		const dashboardUrl = await getSetting('dashboardUrl');
		expect(dashboardUrl).to.equal('https://dashboard.balena-staging.com');
		const vpnUrl = await getSetting('vpnUrl');
		expect(vpnUrl).to.equal('vpn.balena-staging.com');
		const registryUrl = await getSetting('registryUrl');
		expect(registryUrl).to.equal('registry.balena-staging.com');
		const registry2Url = await getSetting('registry2Url');
		expect(registry2Url).to.equal('registry2.balena-staging.com');
		const proxyUrl = await getSetting('proxyUrl');
		expect(proxyUrl).to.equal('balena-staging-devices.com');
	},
);

wary.it('should give precedence to project configuration', {}, async () => {
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
	const balenaUrl = await getSetting('balenaUrl');
	expect(balenaUrl).to.equal('balena.custom.com/');
	const apiUrl = await getSetting('apiUrl');
	expect(apiUrl).to.equal('https://api.balena.custom.com/');
	const dashboardUrl = await getSetting('dashboardUrl');
	expect(dashboardUrl).to.equal('https://dashboard.balena.custom.com/');
	const vpnUrl = await getSetting('vpnUrl');
	expect(vpnUrl).to.equal('vpn.balena.custom.com/');
	const registryUrl = await getSetting('registryUrl');
	expect(registryUrl).to.equal('registry.balena.custom.com/');
	const registry2Url = await getSetting('registry2Url');
	expect(registry2Url).to.equal('registry2.balena.custom.com/');
	const proxyUrl = await getSetting('proxyUrl');
	expect(proxyUrl).to.equal('devices.balena.custom.com/');
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
