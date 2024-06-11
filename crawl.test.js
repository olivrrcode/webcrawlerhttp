const { normaliseURL } = require("./crawl")
const { test, expect } = require("@jest/globals")

test('normaliseURL strip https', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normaliseURL(input)
    const expected = 'blog.boot.dev/path'

    expect(actual).toEqual(expected)
})

test('normaliseURL strip http 2', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normaliseURL(input)
    const expected = 'blog.boot.dev/path'

    expect(actual).toEqual(expected)
})

test('normaliseURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normaliseURL(input)
    const expected = 'blog.boot.dev/path'

    expect(actual).toEqual(expected)
})

test('normaliseURL remove capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normaliseURL(input)
    const expected = 'blog.boot.dev/path'

    expect(actual).toEqual(expected)
})