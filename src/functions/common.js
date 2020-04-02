/**
 * common.js
 */
import fs from 'fs';
import { JSDOM } from 'jsdom';
import { Path } from 'path-parser';

// ローカルと Netlify の環境判定
let netlify = true;
if(!("AWS_REGION" in process.env)) {
    netlify = false;
}

// AWS Lambda で動いていない場合はテンポラリーを dist/tmp に設定
export let tmp = '/tmp'
if(!netlify) {
    tmp = "./dist/tmp"
    try {
        fs.mkdirSync(tmp);
    } catch(e) { }
}

/**
 * createLCD
 *
 * @param {String} html
 * @param {Number} maxCount
 * @param Number} number
 * @returns {String}
 */
export function createLCD(html, width, maxCount, number) {
    const dom = new JSDOM(html);
    const { document } = dom.window;

    // create digit DOM
    let pos = document.querySelector('.digits__inner');
    const digit = document.importNode(document.querySelector('.digit'), true);
    for(let i = 1; i < maxCount; i++) {
        const clone = document.importNode(digit, true);
        clone.removeAttribute('class');
        clone.setAttribute('class', `digit digit-${i}`);
        pos.appendChild(clone);
    }

    // number padding
    let countString = number + ""
    countString = ("0".repeat(maxCount) + number);
    countString = countString.substring(countString.length - maxCount)

    // light digit
    for(let i = 0; i < countString.length; i++) {
        let number = countString.substring(i, i + 1);
        const digit = document.querySelector(`.digit-${i} svg`);
        digit.removeAttribute('class');
        digit.classList.add(`num-${number}`);
    }

    // set width
    let digits = document.querySelector('.digits');
    digits.style = `width: ${width}px;`

    return dom.serialize();
}

/**
 * parseQueryArgs
 *
 * Workaround Netlify args perser.
 * https://community.netlify.com/t/querystringparameters-not-working-with-redirect-on-production/3828
 *
 * @param {String} rewriteUrl
 * @param {Object} queryString
 * @param {String} path
 * @param {Object} format
 * @returns {Object} extract args
 */
export function parseQueryArgs(rewriteUrl, queryString, urlpath, format) {
    let parse = Path.createPath(rewriteUrl).test(urlpath);

    // extract args
    let result = {};
    for(const key in format) {
        if(parse && parse[key]) {
            // clean url
            result[key] = parse[key];
        } else if(!netlify && queryString[key]) {
            // local query string
            result[key] = queryString[key];
        } else {
            // default value
            result[key] = format[key]
        }
    }

    return result;
}
