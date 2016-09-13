settings = require('../../lib/settings')
name = process.argv[2]

try
	if not name?
		throw new Error('Missing setting name')

	console.log(settings.get(name))
catch error
	console.error(error.message, error.stack)
	process.exit(1)
