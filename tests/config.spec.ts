import { expect } from 'chai';
import * as path from 'path';

import config = require('../lib/config');

describe('Config:', () => {
	describe('.paths', () => {
		describe('.user', () => {
			it('should be an absolute path', () => {
				expect(config.paths.user).to.equal(path.resolve(config.paths.user));
			});
		});

		describe('.project', () => {
			it('should be an absolute path', () => {
				expect(config.paths.project).to.equal(
					path.resolve(config.paths.project),
				);
			});
		});
	});
});
