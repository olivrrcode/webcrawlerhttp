const {normaliseURL, getURLsFromHTML} = require("./crawl")
const {test, expect} = require("@jest/globals")

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

test('getURLsFromHTML absolute', () => {
    const inputHtmlBody = `
    <html lang="en">
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHtmlBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHtmlBody = `
    <html lang="en">
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHtmlBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute and relative', () => {
    const inputHtmlBody = `
    <html lang="en">
        <body>
        <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog Path 1
            </a>
            <a href="/path2/">
                Boot.dev Blog Path 2
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHtmlBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid urls', () => {
    const inputHtmlBody = `
    <html lang="en">
        <body>
        <a href="invalid">
                Invalid URL
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHtmlBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})