const test = require('tape')
const nameGen = require('../../util/nameGen')

test('converts one dash', (t) => {
	const names = ['coolName', 'CoolName', 'cool-Name', 'cool-name', 'Cool-name']
	for (const name of names)
		t.equal(nameGen(name), 'cool-name', name)

	t.end()
})

test('leaves names without breaks untouched', (t) => {
	const names = ['nicename', 'Nicename']
	for (const name of names)
		t.equal(nameGen(name), 'nicename', name)

	t.end()
})

test('converts long names', (t) => {
	t.equal(nameGen('thisIs-aVeryLong-Name-withMixedThings'),
		'this-is-a-very-long-name-with-mixed-things',
		'thisIs-aVeryLong-Name-withMixedThings')

	t.equal(nameGen('Another-incredibleNameThat-needs-toBeSplitted'),
		'another-incredible-name-that-needs-to-be-splitted',
		'Another-incredibleNameThat-needs-toBeSplitted')

	t.end()
})
