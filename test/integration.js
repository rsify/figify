import path from 'path'

import browserify from 'browserify'
import test from 'ava'
import {JSDOM} from 'jsdom'

import figify from '../'

test.cb(t => {
	const p = path.resolve(__dirname, 'fixtures')
	const opts = {
		basedir: p
	}

	browserify(p + '/app.js', opts)
		.transform(figify)
		.bundle((err, buf) => {
			t.is(err, null)
			t.not(buf, null)

			const bundle = buf.toString()
			const {window} = new JSDOM(``, {runScripts: 'dangerously'})
			const document = window.document

			const $el = document.createElement('script')
			$el.innerHTML = bundle
			document.head.appendChild($el)

			const comp = window.component
			t.is(comp.name, 'cool-cat')
			t.is(comp.template({heck: 42}), '<h1>42</h1>')
			t.is(comp.style, 'h1 { color: pink; }')
			t.is(typeof comp.default, 'function')

			const v = {}
			comp.default(v)
			t.is(v.heck, 'amazing')

			t.end()
		})
})
