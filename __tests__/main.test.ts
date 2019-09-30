import * as cp from 'child_process'
import * as path from 'path'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    // process.env['MACKEREL_APIKEY'] = 'xxx';
    const ip = path.join(__dirname, '..', 'lib', 'main.js');
    try {
        console.log(cp.execSync(`node ${ip}`).toString());
    } catch (err) {
        console.log(err);
        console.log(err.message);
        console.log(err.stdout.toString());
        console.log(err.stderr.toString());
        // 想定するエラーならとりあえず実行はされている
        expect(err.stdout.toString()).toEqual(expect.stringContaining('env.MACKEREL_APIKEY is requred.'))
    }
})