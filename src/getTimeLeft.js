const dayjs = require("dayjs");
const xmas = dayjs("2023-11-30");

// Helpers
function diff(unit) {
  return Math.abs(xmas.diff(dayjs(), unit));
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
      "Xmas Time could not calculate the time left until Christmas!",
    );
  }
}

// Get the time left and return the text
function getTimeLeft() {
  const unit = getUnit();
  let result = "";

  if (unit !== "celebrating" && unit !== "over") {
    let timeLeft = diff(unit);
    if (unit === "day") {
      const hoursLeft = diff("hour") % 24;
      if (hoursLeft > 0) {
        result = `${timeLeft} days and ${hoursLeft} hours`;
      } else {
        result = `${timeLeft} day(s)`;
      }
    } else if (unit === "hour") {
      const minutesLeft = diff("minute") % 60;
      if (minutesLeft > 0) {
        result = `${timeLeft} hours and ${minutesLeft} minutes`;
      } else {
        result = `${timeLeft} hours`;
      }
    } else {
      result = timeLeft > 1 ? `${timeLeft} ${unit}s` : `${timeLeft} ${unit}`;
    }
  } else if (unit === "celebrating") {
    result = "Merry Christmas!";
  } else if (unit === "over") {
    result = "Christmas is over!";
  }

  if (result !== "") {
    return result;
  } else {
    return console.log(
      "Xmas Time could not calculate the time left until Christmas!",
    );
  }
}

module.exports = { getTimeLeft };
