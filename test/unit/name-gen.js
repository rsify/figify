import test from 'ava'

import nameGen from '../../util/name-gen'

test('converts one dash', t => {
	const names = ['coolName', 'CoolName', 'cool-Name',
		'cool-name', 'Cool-name']
	for (const name of names) {
		t.is(nameGen(name), 'cool-name')
	}
})

test('leaves names without breaks untouched', t => {
	const names = ['nicename', 'Nicename']
	for (const name of names) {
		t.is(nameGen(name), 'nicename', name)
	}
})

test('converts long names', t => {
	t.is(nameGen('thisIs-aVeryLong-Name-withMixedThings'),
		'this-is-a-very-long-name-with-mixed-things')

	t.is(nameGen('Another-incredibleNameThat-needs-toBeSplitted'),
		'another-incredible-name-that-needs-to-be-splitted')
})
