/**
 * common.js
 */
import fs from 'fs';

// カウンターファイルを作成するテンポラリーディレクトリ
export let tmp = '/tmp'
// AWS Lambda で動いていない場合はテンポラリーを dist/tmp に設定
if(!("AWS_REGION" in process.env)) {
    tmp = "./dist/tmp"
    try {
        fs.mkdirSync(tmp);
    } catch(e) { }
}
