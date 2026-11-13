const vscode = require('vscode');
const { parseDate, dateDifference } = require('./dateDifference');

// Helpers

/**
 * @function
 * @param {number} count
 * @param {string} unit
 * @returns {string}
 */
function plural(count, unit) {
    return `${count} ${count > 1 ? `${unit}s` : unit}`;
}

/**
 * @function
 * @param {{ ms: number, days: number }} difference
 * @returns {'m' | 'h' | 'd' | 'celebrating' | 'over'}
 */
function getUnit(difference) {
    // Christmas has come, celebrate for 13 more days
    if (difference.ms < 1) {
        return difference.days < -13 ? 'over' : 'celebrating';
    }
    if (difference.days > 0) {
        return 'd';
    }
    if (difference.hours > 0) {
        return 'h';
    }
    return 'm';
}

// Get the time left and return the text

/**
 * @function
 * @param {Date} [now]
 * @returns {string}
 */
function getTimeLeft(now = new Date()) {
    const { yourXmas } = vscode.workspace.getConfiguration('xmasTime');
    const xmas = parseDate(yourXmas);

    if (!xmas) {
        console.log(
            'Xmas Time could not calculate the time left until Christmas!'
        );
        return 'Invalid Xmas date!';
    }

    const difference = dateDifference(now, xmas);

    switch (getUnit(difference)) {
        case 'd': {
            const hoursLeft = difference.hours % 24;
            return hoursLeft > 0
                ? `${plural(difference.days, 'day')} and ${plural(
                      hoursLeft,
                      'hour'
                  )}`
                : plural(difference.days, 'day');
        }
        case 'h': {
            const minutesLeft = (difference.minutes % 60) + 1;
            return minutesLeft !== 60
                ? `${plural(difference.hours, 'hour')} and ${plural(
                      minutesLeft,
                      'minute'
                  )}`
                : plural(difference.hours + 1, 'hour');
        }
        case 'm':
            return plural(difference.minutes + 1, 'minute');
        case 'celebrating':
            return 'Merry Christmas!';
        case 'over':
            return 'Christmas is over!';
    }
}

/**
 * @exports
 * @type {{
 *   getTimeLeft: function(Date=): string
 * }}
 */
module.exports = { getTimeLeft };
