/**
 * common.js
 */
import fs from 'fs';
import jsdom from 'jsdom';

// JSDOM
const { JSDOM } = jsdom;

// カウンターファイルを作成するテンポラリーディレクトリ
export let tmp = '/tmp'
// AWS Lambda で動いていない場合はテンポラリーを dist/tmp に設定
if(!("AWS_REGION" in process.env)) {
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
export function updateLCD(html, maxCount, number) {
    const dom = new JSDOM(html);
    const { document } = dom.window;

    let countString = number + ""
    countString = ("0".repeat(maxCount) + number);
    countString = countString.substring(countString.length - maxCount)

    for(let i = 0; i < countString.length; i++) {
        let number = countString.substring(i, i + 1);
        const digi = document.querySelector(`.digit-${i} svg`);
        digi.removeAttribute('class');
        digi.classList.add(`num-${number}`);
    }

    return dom.serialize();
}
