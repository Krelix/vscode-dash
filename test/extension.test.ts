
import * as assert from 'assert';
import {Dash} from '../src/dash';
import {platform} from 'os';
//import * as mockery from 'mockery';

var platforms = {
    'win32': 'cmd /c start ""',
    'linux': 'xdg-open',
    'freebsd': 'xdg-open',
    'sunos': 'xdg-open',
    'darwin': 'open -g',
    'unknown': 'open -g',
}

suite("Dash Tests", () => {

    test('Get command with keys', () => {
        let dash = new Dash();
        var uri = dash.getCommand('size', ['css', 'less']);
        var command = platforms[platform()] || 'open -g';

        assert.equal(uri, `${command} "dash-plugin://query=size&keys=css,less"`);
    });

    test('Get command with no keys', () => {
        let dash = new Dash();
        var uri = dash.getCommand('size');
        var command = platforms[platform()] || 'open -g';

        assert.equal(uri, `${command} "dash-plugin://query=size"`);
    });

    test('Get platform command line ', () => {
        // iterate over keys
        /*for (var k in platforms) {
            let stubOs = {
                'platform': function () { 
                    console.log(`returning ${k}`);
                    return k; 
                }
            };
            // mock call to os.platform() to return a specific platform for tests
            mockery.registerMock('os', stubOs);
            mockery.enable({ useCleanCache: true });
            let dash = new Dash();
            let command = dash.getPlatformCommand();
            console.log(`testing with platform ${k}: ${platforms[k]}`);
            console.log(`actual is ${command}`);
            assert.equal(command, platforms[k]);
            mockery.deregisterMock('os');
            mockery.disable();
        }*/
        let dash = new Dash();
        let command = dash.getPlatformCommand();
        assert.equal(command, platforms[platform()]);
    });

    test('Get keys with exist docset', () => {
        let dash = new Dash();
        var keys = dash.getKeys(['css', 'less']);

        assert.equal(keys, 'css,less');
    });

    test('Get keys with empty docset', () => {
        let dash = new Dash();
        var keys = dash.getKeys([]);

        assert.equal(keys, '');
    });
});