// Convert camel case names to kebab case

module.exports = name => {
	if (name === null || name.length === 0) {
		throw new Error('invalid name')
	}

	name = name.slice(0, 1).toLowerCase() + name.slice(1)
	return name
		.replace(/-[A-Z]+/, x => x.toLowerCase())
		.split(/([A-Z])/)
		.map(x => {
			if (x.toUpperCase() === x) {
				return ('-' + x.toLowerCase())
			}
			return x
		})
		.join('')
}
