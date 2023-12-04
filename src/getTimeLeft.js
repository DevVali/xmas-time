const dayjs = require('dayjs');
// Globally its celebrated on 25th but some countries celebrate on the 24th december
const xmas = dayjs('2023-12-25');

// Helpers

function diff(unit) {
    return xmas.diff(dayjs(), unit);
}

function getUnit() {
    let result = '';

    // Less than 1 ms
    if (diff('ms') < 1) {
        result = 'celebrating';
        if (diff('d') < -15) {
            result = 'over';
        }
    }
    // Greather than 1 ms
    if (diff('ms') > 1) {
        result = 'm';
        if (diff('d') > 0) {
            result = 'd';
        } else if (diff('h') > 0) {
            result = 'h';
        }
    }
    if (result !== '') {
        return result;
    } else {
        return console.log(
            'Xmas Time could not calculate the time left until Christmas!'
        );
    }
}

// Get the time left and return the text

function getTimeLeft() {
    const unit = getUnit();
    let timeLeft = diff(unit);
    let result = '';

    switch (unit) {
        case 'm':
            timeLeft += 1;
            result = `${timeLeft} ${timeLeft > 1 ? 'minutes' : 'minute'}`;
            break;
        case 'd':
            const hoursLeft = diff('h') % 24;
            if (hoursLeft > 0) {
                result = `${timeLeft} ${
                    timeLeft > 1 ? 'days' : 'day'
                } and ${hoursLeft} ${hoursLeft > 1 ? 'hours' : 'hour'}`;
            } else {
                result = `${timeLeft} ${timeLeft > 1 ? 'days' : 'day'}`;
            }
            break;
        case 'h':
            const minutesLeft = (diff('m') % 60) + 1;
            if (minutesLeft > 0 && minutesLeft !== 60) {
                result = `${timeLeft} ${
                    timeLeft > 1 ? 'hours' : 'hour'
                } and ${minutesLeft} ${minutesLeft > 1 ? 'minutes' : 'minute'}`;
            } else {
                timeLeft += 1;
                result = `${timeLeft} ${timeLeft > 1 ? 'hours' : 'hour'}`;
            }
            break;
        case 'celebrating':
            result = 'Merry Christmas!';
            break;
        case 'over':
            result = 'Christmas is over!';
            break;
    }
    if (result !== '') {
        return result;
    } else {
        return console.log(
            'Xmas Time could not calculate the time left until Christmas!'
        );
    }
}

module.exports = { getTimeLeft };
