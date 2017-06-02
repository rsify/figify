const babel = require('babel-core')
const conv = require('convert-source-map')
const path = require('path')
const pug = require('pug')
const sourceMap = require('source-map')
const through = require('through2')

const nameGen = require('./util/nameGen')

const EXTENSIONS = ['.fig', '.pug']

module.exports = file => {
	const parsed = path.parse(file)
	const extension = parsed.ext
	const fileName = parsed.name
	const baseName = parsed.base
	const dirName = parsed.dir

	if (EXTENSIONS.indexOf(extension) === -1) return through()

	return through(function (buf, enc, next) {
		const fileContents = buf.toString('utf8')
		const lines = fileContents.split('\n')

		const tagContent = tag => {
			let index = lines.findIndex(x => x.indexOf(tag) === 0)
			if (index === -1) return null
			index += 1

			let endIndex = lines.slice(index)
				.findIndex(x => /^\S/.test(x))

			let content
			if (endIndex !== -1)
				content = lines.slice(index, index + endIndex)
			else
				content = lines.slice(index)

			const indentIndex = content[0].search(/\S/)
			return content.map(x => x.slice(indentIndex)).join('\n')
		}

		const genExport = (name, str, quoted = true) => {
			const p = 'module.exports.' + name + '='
			if (str === null) return p + 'null;'
			else if (quoted) {
				const val = str.split('\n')
					.map(x => ('\'' + x + '\''))
					.join('+\n')
				return p + val + ';'
			}
			else return p + str + ';'
		}

		// template
		const compiled = pug.compileClient(tagContent('template'))
		this.push(compiled)
		this.push(genExport('template', 'template\n', false))

		// style
		this.push(genExport('style', tagContent('style')))

		// script
		const scriptContent = tagContent('script')
		const transformed = babel.transform(scriptContent, {
			presets: require('babel-preset-es2015')
		})
		this.push(transformed.code)

		// name
		this.push(genExport('name', nameGen(fileName)))

		next()
	})
}
