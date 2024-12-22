function dateDifference(dateA, dateB) {
    const differenceMS = dateB - dateA;
    console.log(differenceMS);
    const days = Math.trunc(differenceMS / 86400000);
    const hours = Math.trunc((differenceMS % 86400000) / 3600000);
    const minutes = Math.trunc(((differenceMS % 86400000) % 3600000 ) / 60000);

    return {
        days: days,
        hours: hours,
        minutes: minutes
    }
}

export default dateDifference;