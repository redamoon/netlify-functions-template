/**
 * Lambda 版アクセスカウンター
 *  インスタンスの再生成でカウントは消えます。
 */
import fs from 'fs';
import * as common from '../common';
import html from '../resources/fujilcd.html';

// カウンターの最大桁数
const maxCount = 6;

// async await 版の fs オブジェクト
const fsp = fs.promises;

// カウンターファイル JSON 出力パス
const counterJsonFile = common.tmp + "/counter.json";
// DOM 操作確認用 HTML 出力パス
const counterHtmlFile = common.tmp + "/counter.html";

/**
 * Lambda エンドポイント
 */
exports.handler = async (event) => {
    // debugger;
    const now = new Date();
    let counterJson = {
        "createDate": now,
        "updateDate": now,
        "count": 1
    };
    try {
        // カウンターファイル存在確認
        const data = await fsp.readFile(counterJsonFile);
        // カウンターファイルが存在すれば JSON 解析してカウンターを更新
        counterJson = JSON.parse(data.toString('utf-8'));
        counterJson.updateDate = now;
        counterJson.count++;
    } catch(e) {
        // カウンターファイルがなければ例外を潰して新規作成
    }
    // カウンターファイル書き込み
    await fsp.writeFile(counterJsonFile, JSON.stringify(counterJson));
    // カウンター数 SVG を生成
    counterJson.html = common.updateLCD(html, maxCount, counterJson.count);
    // DOM 操作確認用ファイル書き込み（テスト）
    await fsp.writeFile(counterHtmlFile, counterJson.html);
    // for test "Access-Control-Allow-Origin":  "*"
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin":  "*"
        },
        body: JSON.stringify(counterJson)
    };
};
