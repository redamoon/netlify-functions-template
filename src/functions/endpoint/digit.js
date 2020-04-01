/**
 * Lambda 版デジタルカウンター出力
 *
 */
import * as common from '../common'
import html from '../resources/fujilcd.html'

/**
 * Lambda エンドポイント
 */
exports.handler = async (event) => {
    // query args
    console.log(event.queryStringParameters);
    console.log(event.path);
    // ?width=120&digit=6&number=123456
    let _width = 120;
    let digit = 6;
    let number = 123456;
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
        },
        body: common.updateLCD(html, digit, number)
    }
};
