const path = require('path')

const compiler = require('fig-compiler')
const through = require('through2')

const nameGen = require('./util/name-gen')

const EXTENSIONS = ['.fig', '.pug']

module.exports = file => {
	const parsed = path.parse(file)
	const extension = parsed.ext
	const fileName = parsed.name

	if (EXTENSIONS.indexOf(extension) === -1) {
		return through()
	}

	const chunks = []
	const transform = (chunk, encoding, callback) => {
		chunks.push(chunk)
		callback()
	}

	const flush = function (callback) {
		const contents = Buffer.concat(chunks).toString()

		let compiled
		try {
			compiled = compiler(contents, {
				defaultName: nameGen(fileName),
				filePath: file
			})
		} catch (err) {
			return callback(err)
		}

		const exported = (name, str, quoted = true) => {
			const p = 'module.exports.' + name + ' = '

			if (str === null) {
				return p + 'null;'
			} else if (quoted) {
				const val = str.split('\n')
					.map(x => ('\'' + x + '\''))
					.join('+\n')
				return p + val + ';\n'
			}
			return p + str + ';\n'
		}

		this.push(exported('template', compiled.template.toString(), false))
		this.push(exported('style', compiled.style))
		this.push(exported('name', compiled.name))
		this.push(compiled.script)

		callback()
	}

	return through(transform, flush)
}
