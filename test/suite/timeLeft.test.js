const assert = require('assert');
const vscode = require('vscode');
const { parseDate, dateDifference } = require('../../src/dateDifference');
const { getTimeLeft } = require('../../src/getTimeLeft');

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

suite('Time Left Test Suite', () => {
    const { yourXmas } = vscode.workspace.getConfiguration('xmasTime');
    const xmas = parseDate(yourXmas);
    const before = (ms) => new Date(xmas.getTime() - ms);

    test('parseDate parses local midnight', () => {
        const date = parseDate('2025-12-25');
        assert.strictEqual(date.getFullYear(), 2025);
        assert.strictEqual(date.getMonth(), 11);
        assert.strictEqual(date.getDate(), 25);
        assert.strictEqual(date.getHours(), 0);
    });

    test('parseDate rejects invalid dates', () => {
        assert.strictEqual(parseDate('2025-02-31'), null);
        assert.strictEqual(parseDate('25-12-2025'), null);
        assert.strictEqual(parseDate(''), null);
    });

    test('dateDifference truncates every unit', () => {
        const difference = dateDifference(
            before(DAY + 2 * HOUR + 30 * MINUTE),
            xmas
        );
        assert.strictEqual(difference.days, 1);
        assert.strictEqual(difference.hours, 26);
        assert.strictEqual(difference.minutes, 26 * 60 + 30);
    });

    test('days and hours', () => {
        assert.strictEqual(
            getTimeLeft(before(3 * DAY + 5 * HOUR + 10 * MINUTE)),
            '3 days and 5 hours'
        );
        assert.strictEqual(getTimeLeft(before(DAY + HOUR)), '1 day and 1 hour');
        assert.strictEqual(getTimeLeft(before(2 * DAY)), '2 days');
    });

    test('hours and minutes', () => {
        assert.strictEqual(
            getTimeLeft(before(5 * HOUR + 10 * MINUTE + 30 * 1000)),
            '5 hours and 11 minutes'
        );
        assert.strictEqual(
            getTimeLeft(before(HOUR + 59 * MINUTE + 30 * 1000)),
            '2 hours'
        );
    });

    test('minutes', () => {
        assert.strictEqual(getTimeLeft(before(30 * 1000)), '1 minute');
        assert.strictEqual(getTimeLeft(before(42 * MINUTE)), '43 minutes');
    });

    test('celebrating and over', () => {
        assert.strictEqual(getTimeLeft(xmas), 'Merry Christmas!');
        assert.strictEqual(getTimeLeft(before(-13 * DAY)), 'Merry Christmas!');
        assert.strictEqual(
            getTimeLeft(before(-14 * DAY)),
            'Christmas is over!'
        );
    });
});
