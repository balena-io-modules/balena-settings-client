import { expect } from 'chai';
import * as path from 'path';

import defaults = require('../lib/defaults');
import * as utils from '../lib/utils';

describe('Defaults:', () => {
	describe('.balenaUrl', () => {
		it('should not contain a protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'balenaUrl');
			expect(setting).to.not.match(/^\w+:\/\//);
		});

		it('should be a valid url after adding a protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'balenaUrl');
			expect(() => new URL(`htps://${setting}`)).to.not.throw(Error);
		});
	});

	describe('.apiUrl', () => {
		it('should be a valid url', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'apiUrl');
			expect(() => new URL(setting)).to.not.throw(Error);
		});

		it('should contain an https protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'apiUrl');
			expect(new URL(setting).protocol).to.equal('https:');
		});
	});

	describe('.vpnUrl', () => {
		it('should not contain a protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'vpnUrl');
			expect(setting).to.not.match(/^\w+:\/\//);
		});

		it('should be a valid url after adding a protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'vpnUrl');
			expect(() => new URL(`htps://${setting}`)).to.not.throw(Error);
		});
	});

	describe('.registryUrl', () => {
		it('should not contain a protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'registryUrl');
			expect(setting).to.not.match(/^\w+:\/\//);
		});

		it('should be a valid url after adding a protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'registryUrl');
			expect(() => new URL(`htps://${setting}`)).to.not.throw(Error);
		});
	});

	describe('.registry2Url', () => {
		it('should not contain a protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'registry2Url');
			expect(setting).to.not.match(/^\w+:\/\//);
		});

		it('should be a valid url after adding a protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'registry2Url');
			expect(() => new URL(`htps://${setting}`)).to.not.throw(Error);
		});
	});

	describe('.imageMakerUrl', () => {
		it('should throw', () => {
			expect(() =>
				utils.evaluateSetting<string>(defaults, 'imageMakerUrl'),
			).to.throw(Error, 'Setting not found: imageMakerUrl');
		});
	});

	describe('.deltaUrl', () => {
		it('should be a valid url', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'deltaUrl');
			expect(() => new URL(setting)).to.not.throw(Error);
		});

		it('should contain an https protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'deltaUrl');
			expect(new URL(setting).protocol).to.equal('https:');
		});
	});

	describe('.dashboardUrl', () => {
		it('should be a valid url', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'dashboardUrl');
			expect(() => new URL(setting)).to.not.throw(Error);
		});

		it('should contain an https protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'dashboardUrl');
			expect(new URL(setting).protocol).to.equal('https:');
		});
	});

	describe('.proxyUrl', () => {
		it('should not contain a protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'proxyUrl');
			expect(setting).to.not.match(/^\w+:\/\//);
		});

		it('should be a valid url after adding a protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'proxyUrl');
			expect(() => new URL(`htps://${setting}`)).to.not.throw(Error);
		});
	});

	describe('.tunnelUrl', () => {
		it('should not contain a protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'tunnelUrl');
			expect(setting).to.not.match(/^\w+:\/\//);
		});

		it('should be a valid url after adding a protocol', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'tunnelUrl');
			expect(() => new URL(`htps://${setting}`)).to.not.throw(Error);
		});
	});

	describe('.dataDirectory', () =>
		it('should be an absolute path', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'dataDirectory');
			expect(setting).to.be.equal(path.resolve(setting));
		}));

	describe('.projectsDirectory', () =>
		it('should be an absolute path', () => {
			const setting = utils.evaluateSetting<string>(
				defaults,
				'projectsDirectory',
			);
			expect(setting).to.be.equal(path.resolve(setting));
		}));

	describe('.cacheDirectory', () =>
		it('should be an absolute path', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'cacheDirectory');
			expect(setting).to.be.equal(path.resolve(setting));
		}));

	describe('.imageCacheTime', () => {
		it('should be a number', () => {
			const setting = utils.evaluateSetting<number>(defaults, 'imageCacheTime');
			expect(setting).to.be.a('number');
		});

		it('should be a positive number', () => {
			const setting = utils.evaluateSetting<number>(defaults, 'imageCacheTime');
			expect(setting).to.be.greaterThan(0);
		});
	});

	describe('.tokenRefreshInterval', () => {
		it('should be a number', () => {
			const setting = utils.evaluateSetting<number>(
				defaults,
				'tokenRefreshInterval',
			);
			expect(setting).to.be.a('number');
		});

		it('should be a positive number', () => {
			const setting = utils.evaluateSetting<number>(
				defaults,
				'tokenRefreshInterval',
			);
			expect(setting).to.be.greaterThan(0);
		});

		it('should be an integer', () => {
			const setting = utils.evaluateSetting<number>(
				defaults,
				'tokenRefreshInterval',
			);
			expect(setting % 1).to.equal(0);
		});
	});

	describe('.apiKeyVariable', () => {
		it('should be a string', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'apiKeyVariable');
			expect(setting).to.be.a('string');
		});

		it('should not be empty', () => {
			const setting = utils.evaluateSetting<string>(defaults, 'apiKeyVariable');
			expect(setting.trim().length).to.not.equal(0);
		});
	});
});
