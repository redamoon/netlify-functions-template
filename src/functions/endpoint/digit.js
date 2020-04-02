/**
 * Lambda 版デジタルカウンター出力
 *
 */
import * as common from '../common';
import html from '../resources/fujilcd.html';

/**
 * Lambda エンドポイント
 *
 *  digit?width=500&digit=6&number=10
 *  /v1/digit/500/6/10/
 */
exports.handler = async (event) => {
    // query args
    const args = common.parseQueryArgs(
        '/v1/digit/:width<\\d+>/:digit<\\d+>/:number<\\d+>/',
        event.queryStringParameters,
        event.path,
        {
            width : 120,
            digit: 6,
            number: 123456
        }
    );
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
        },
        body: common.updateLCD(html, args.digit, args.number)
    };
};
