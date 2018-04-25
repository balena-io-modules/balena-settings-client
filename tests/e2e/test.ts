import * as Promise from 'bluebird';
import * as childProcess from 'child_process';
import { stripIndent } from 'common-tags';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as m from 'mochainon';
import * as path from 'path';
import * as wary from 'wary';

import config = require('../../lib/config');

const execAsync = Promise.promisify<[string, string], string, any>(
	childProcess.exec,
	{ multiArgs: true }
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
		handleExecResult
	);
};

const getAll = () => {
	const script = path.join(__dirname, 'get-all.ts');
	return execAsync(`ts-node ${script}`, { encoding: 'utf8' })
		.spread(handleExecResult)
		.then(JSON.parse);
};

wary.it(
	'should override defaults given a user configuration that points to staging',
	{},
	() => {
		fs.writeFileSync(
			config.paths.user,
			stripIndent`
				resinUrl: resinstaging.io/
			`
		);
		return Promise.props({
			resinUrl: getSetting('resinUrl'),
			apiUrl: getSetting('apiUrl'),
			dashboardUrl: getSetting('dashboardUrl'),
			vpnUrl: getSetting('vpnUrl'),
			registryUrl: getSetting('registryUrl'),
			registry2Url: getSetting('registry2Url'),
			proxyUrl: getSetting('proxyUrl')
		}).then(settings => {
			m.chai.expect(settings.resinUrl).to.equal('resinstaging.io/');
			m.chai.expect(settings.apiUrl).to.equal('https://api.resinstaging.io/');
			m.chai
				.expect(settings.dashboardUrl)
				.to.equal('https://dashboard.resinstaging.io/');
			m.chai.expect(settings.vpnUrl).to.equal('vpn.resinstaging.io/');
			m.chai.expect(settings.registryUrl).to.equal('registry.resinstaging.io/');
			m.chai
				.expect(settings.registry2Url)
				.to.equal('registry2.resinstaging.io/');
			m.chai.expect(settings.proxyUrl).to.equal('devices.resinstaging.io/');
		});
	}
);

wary.it('should give precedence to project configuration', {}, () => {
	fs.writeFileSync(
		config.paths.user,
		stripIndent`
			resinUrl: resinstaging.io/
		`
	);
	fs.writeFileSync(
		config.paths.project,
		stripIndent`
			resinUrl: resin.custom.com/
		`
	);
	return Promise.props({
		resinUrl: getSetting('resinUrl'),
		apiUrl: getSetting('apiUrl'),
		dashboardUrl: getSetting('dashboardUrl'),
		vpnUrl: getSetting('vpnUrl'),
		registryUrl: getSetting('registryUrl'),
		registry2Url: getSetting('registry2Url'),
		proxyUrl: getSetting('proxyUrl')
	}).then(settings => {
		m.chai.expect(settings.resinUrl).to.equal('resin.custom.com/');
		m.chai.expect(settings.apiUrl).to.equal('https://api.resin.custom.com/');
		m.chai
			.expect(settings.dashboardUrl)
			.to.equal('https://dashboard.resin.custom.com/');
		m.chai.expect(settings.vpnUrl).to.equal('vpn.resin.custom.com/');
		m.chai.expect(settings.registryUrl).to.equal('registry.resin.custom.com/');
		m.chai
			.expect(settings.registry2Url)
			.to.equal('registry2.resin.custom.com/');
		m.chai.expect(settings.proxyUrl).to.equal('devices.resin.custom.com/');
	});
});

wary.it(
	'should give precedende to environment variable configuration',
	{},
	() => {
		fs.writeFileSync(
			config.paths.user,
			stripIndent`
				resinUrl: resinstaging.io/
			`
		);
		fs.writeFileSync(
			config.paths.project,
			stripIndent`
				resinUrl: resin.custom.com/
			`
		);
		process.env.RESINRC_RESIN_URL = 'resindev.custom.com/';

		return m.chai
			.expect(getSetting('resinUrl'))
			.to.eventually.equal('resindev.custom.com/');
	}
);

wary.it('should be able to return all settings', {}, () => {
	process.env.RESINRC_PROJECTS_DIRECTORY = '/usr/src/projects';
	process.env.RESINRC_DATA_DIRECTORY = '/opt';

	return m.chai.expect(getAll()).to.eventually.deep.equal({
		resinUrl: 'resindev.custom.com/',
		apiUrl: 'https://api.resindev.custom.com/',
		vpnUrl: 'vpn.resindev.custom.com/',
		registryUrl: 'registry.resindev.custom.com/',
		registry2Url: 'registry2.resindev.custom.com/',
		imageMakerUrl: 'https://img.resindev.custom.com/',
		deltaUrl: 'https://delta.resindev.custom.com/',
		dashboardUrl: 'https://dashboard.resindev.custom.com/',
		proxyUrl: 'devices.resindev.custom.com/',
		dataDirectory: '/opt',
		cacheDirectory: path.join('/opt', 'cache'),
		binDirectory: path.join('/opt', 'bin'),
		projectsDirectory: '/usr/src/projects',
		imageCacheTime: 604800000,
		tokenRefreshInterval: 3600000,
		apiKeyVariable: 'RESIN_API_KEY'
	});
});

wary.it('should be rejected if the config file is malformed', {}, () => {
	fs.writeFileSync(
		config.paths.project,
		stripIndent`
			resinUrl=resin.custom.com/
		`
	);

	return m.chai
		.expect(getAll())
		.to.be.rejectedWith('Error parsing config file');
});

wary
	.run()
	.catch(error => {
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
