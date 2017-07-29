import fs from 'fs'
import path from 'path'
import vm from 'vm'

import test from 'ava'
import through from 'through2'

import figify from '../'

test.cb(t => {
	const p = path.resolve(__dirname, 'fixtures/CoolCat.fig')

	const collector = []
	fs.createReadStream(p)
		.pipe(figify(p))
		.pipe(through((buf, enc, cb) => {
			collector.push(buf.toString())
			return cb()
		}))
		.on('finish', () => {
			const str = collector.join('\n')

			const script = new vm.Script(str)
			const module = {
				exports: {}
			}
			const sandbox = {
				module,
				exports: module.exports
			}
			script.runInContext(vm.createContext(sandbox))

			t.is(sandbox.exports.name, 'cool-cat')
			t.is(sandbox.exports.template({heck: 42}), '<h1>42</h1>')
			t.is(sandbox.exports.style, 'h1 { color: pink; }')
			t.is(typeof sandbox.exports.default, 'function')

			const v = {}
			sandbox.exports.default(v)
			t.is(v.heck, 'amazing')

			t.end()
		})
})
