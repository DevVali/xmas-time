import dateDifference from './dateDifference';

const vscode = require('vscode');

// Get the time left and return the text
function getTimeLeft() {
    const { yourXmas } = vscode.workspace.getConfiguration('xmasTime');
    const difference = dateDifference(Date.now(), Date.parse(yourXmas));

    if (difference.minutes < 0 && difference.days == 0) { // 60 * 24 minutes per day
        // it is the christmas day
        return "Merry Christmas!";
    } else if (difference.days <= -1) {
        // christmas is over
        return "Christmas is over!";
    }

    if (difference.days > 0) {
        // days hours
        return `${difference.days} ${difference.days > 1 ? "days" : "day"} and ${difference.hours} ${difference.hours > 1 ? "hours" : "hour"}`
    } else {
        if (difference.hours > 0) {
            // hours minutes
            return `${difference.hours} ${difference.hours > 1 ? "hours" : "hour"} and ${difference.minutes} ${difference.minutes > 1 ? "minutes" : "minute"}`
        } else {
            // minutes
            return `${difference.minutes} ${difference.minutes > 1 ? "minutes" : "minute"}`
        }
    }
}

export default getTimeLeft;
