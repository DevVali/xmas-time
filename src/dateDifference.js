const MS_PER_MINUTE = 60 * 1000;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

/**
 * Parse a YYYY-MM-DD string as local midnight (like dayjs does).
 * `Date.parse` would treat it as UTC midnight instead.
 * @function
 * @param {string} date
 * @returns {Date | null}
 */
function parseDate(date) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(date).trim());
    if (!match) {
        return null;
    }

    const [, year, month, day] = match.map(Number);
    const result = new Date(year, month - 1, day);

    // Reject overflowing dates such as 2025-02-31
    if (result.getMonth() !== month - 1 || result.getDate() !== day) {
        return null;
    }

    return result;
}

/**
 * Get the difference between two dates, truncated per unit (like dayjs' diff).
 * @function
 * @param {Date} from
 * @param {Date} to
 * @returns {{ ms: number, days: number, hours: number, minutes: number }}
 */
function dateDifference(from, to) {
    const ms = to.getTime() - from.getTime();
    // Compensate for DST changes so whole days stay whole
    const zoneDelta =
        (to.getTimezoneOffset() - from.getTimezoneOffset()) * MS_PER_MINUTE;

    return {
        ms,
        days: Math.trunc((ms - zoneDelta) / MS_PER_DAY),
        hours: Math.trunc(ms / MS_PER_HOUR),
        minutes: Math.trunc(ms / MS_PER_MINUTE),
    };
}

/**
 * @exports
 * @type {{
 *   parseDate: function(string): (Date | null),
 *   dateDifference: function(Date, Date): { ms: number, days: number, hours: number, minutes: number }
 * }}
 */
module.exports = { parseDate, dateDifference };
