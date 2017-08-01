import * as settings from '../../lib/settings';
const name = process.argv[2];

try {
	if (name == null) {
		throw new Error('Missing setting name');
	}

	console.log(settings.get(name));
} catch (error) {
	console.error(error.message, error.stack);
	process.exit(1);
}
