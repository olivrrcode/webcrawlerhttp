const { normaliseURL } = require("./crawl")
const { test, expect } = require("@jest/globals")

test('normaliseURL', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normaliseURL(input)
    const expected = ''

    expect(actual).toEqual(expected)
})