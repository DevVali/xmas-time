const dayjs = require("dayjs");
const xmas = dayjs("2023-12-24");

// Helpers
function diff(unit) {
    return xmas.diff(dayjs(), unit, false);
}
function getUnit() {
    let result = "";

    // Less than 1 ms
    if (diff("ms") < 1) {
        result = "celebrating";
        if (diff("day") < -15) {
            result = "over";
        }
    }
    // Greather than 1 ms
    if (diff("ms") > 1) {
        result = "second";
        if (diff("day") > 0) {
            result = "day";
        } else if (diff("hour") > 0) {
            result = "hour";
        } else if (diff("minute") > 0) {
            result = "minute";
        }
    }
    if (result !== "") {
        return result;
    } else {
        return console.log(
            "Xmas Time could not calculate the time left until Christmas!"
        );
    }
}

// Get the time left and return the text
function getTimeLeft() {
    const unit = getUnit();
    let result = "";

    if (unit !== "celebrating" && unit !== "over") {
        result =
            diff(unit) > 1 ? `${diff(unit)} ${unit}s` : `${diff(unit)} ${unit}`;
    } else if (unit === "celebrating") {
        result = "Merry Christmas!";
    } else if (unit === "over") {
        result = "Christmas are over!";
    }
    if (result !== "") {
        return result;
    } else {
        return console.log(
            "Xmas Time could not calculate the time left until Christmas!"
        );
    }
}

module.exports = { getTimeLeft };
