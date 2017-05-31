// convert camel case names to kebab case

module.exports = (name) => {
	if (!name.length) throw 'invalid name'

	name = name.slice(0, 1).toLowerCase() + name.slice(1)
	return name
		.replace(/-[A-Z]+/, x => x.toLowerCase())
		.split(/([A-Z])/)
		.map(x => {
			if (x.toUpperCase() === x)
				return ('-' + x.toLowerCase())
			else return x
		 })
		.join('')
}
