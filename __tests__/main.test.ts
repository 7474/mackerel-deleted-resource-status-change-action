import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    // process.env['MACKEREL_APIKEY'] = 'xxx';
    const ip = path.join(__dirname, '..', 'lib', 'main.js');
    // 特定のエラーメッセージが出力、辺りをテストできるといいのだけれどどうにかならんものか
    console.log(cp.execSync(`node ${ip}`).toString());
})