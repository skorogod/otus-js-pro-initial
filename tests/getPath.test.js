const path = require('path');
const fs = require('fs');
const { beforeAll, it, expect } = require('@jest/globals');
const { getPath } = require('../modules/getPath');


beforeAll(() => {
    const html = fs.readFileSync('src/index.html');
    document.documentElement.innerHTML = html.toString();
})

describe("getPath", () => {
    it("getPath is a function", () => {
        expect(getPath).toBeInstanceOf(Function);
    })

    it ("getPath returns 'body' for body tag", () => {
        const bodyEl = document.querySelector('body');
        const selector = getPath(bodyEl);
        expect(selector).toBe('body');
    })

    it ("getPath returns 'html' for HTML tag", () => {
        const htmlEl = document.querySelector('html');
        const selector = getPath(htmlEl);
        expect(selector).toBe('html');
    })

    it("getPath returns #main selector", () => {
        const mainElement = document.querySelector('#main');
        const selector = getPath(mainElement);
        expect(selector).toBe("#main");
    })

    it("getPath returns '.categories__list.list > li:nth-child(2)' for the second 'li' element of categories list", () => {
        const liEl = document.querySelectorAll('.categories .list__item')[1];
        const selector = getPath(liEl);
        expect(selector).toBe('.categories__list.list > li:nth-child(2)')
    })
})