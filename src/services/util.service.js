export const utilService = {
    getRandomIntInclusive,
    formatTimeToDM,
    getPosition,
    calcTextareaHeight,
    getTimeAgo,
    isImage,
    getDateTimeFormat,
    getYearMonthFormat,
    getTimeFormat,
    getNewDateTime,
    getMonthName,
    getTimeList,
    getTimeInMs,
    getCurrentTimeFormat,
    getdays,
    getTripLong,
    getTimeDiff,
    getTime,
    getIsInSchedule,
    getTimeRemainingToArrive,
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function formatTimeToDM(time) {
    var date = new Date(time)
    var month = date.getMonth(date)
    var day = date.getDate(date)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${monthNames[month]} ${day}`
}

function getPosition(element) {
    if (!element) return
    let { top, left } = element.getBoundingClientRect()
    return { top, left }
}

function calcTextareaHeight(value, minHeight, lineHeight) {
    const numberOfLineBreaks = (value.match(/\n/g) || []).length
    return minHeight + numberOfLineBreaks * lineHeight  // min-height + num + numOfLineBreaks * line-height
}

function getTimeAgo(timestamp, locale = 'en') {
    let value
    const diff = Math.floor((Date.now() - timestamp) / 1000)
    const minutes = Math.floor(diff / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })

    if (years > 0) {
        value = rtf.format(0 - years, "year")
    } else if (months > 0) {
        value = rtf.format(0 - months, "month")
    } else if (days > 0) {
        value = rtf.format(0 - days, "day")
    } else if (hours > 0) {
        value = rtf.format(0 - hours, "hour")
    } else if (minutes > 0) {
        value = rtf.format(0 - minutes, "minute")
    } else {
        // value = rtf.format(0 - diff, "second")
        value = 'Just now'
    }
    return value
}

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
}

function getDateTimeFormat(date) {
    const now = new Date()
    const month = new Intl.DateTimeFormat('en', { month: 'short' })
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' })
    const time = new Intl.DateTimeFormat('he', { hour: 'numeric', minute: 'numeric' })
    const displayDate = `${month.format(date)} ${day.format(date)} at ${time.format(date)}`
    const displayDateOnly = `${day.format(date)} ${month.format(date)}`
    const statusDate = date > now.setHours(23, 59, 59, 59)
        ? ''
        : (date > Date.now()
            ? 'duesoon'
            : 'overdue')

    return { displayDate, statusDate, displayDateOnly }
}

function getYearMonthFormat(date) {
    const month = new Intl.DateTimeFormat('en', { month: 'short' })
    const year = new Intl.DateTimeFormat('he', { year: 'numeric' })
    const displayDate = `${month.format(date)} ${year.format(date)}`

    return displayDate
}

function getTimeFormat(date) {
    const time = new Intl.DateTimeFormat('he', { hour: 'numeric', minute: 'numeric' })
    return time.format(date)
}

function getNewDateTime(date, time) {
    const milliseconds = (h, m, s) => ((h * 60 * 60 + m * 60 + s) * 1000)
    const timeParts = time.split(":")
    let newDate = new Date(date)
    newDate = newDate.setHours(0, 0, 0)
    return milliseconds(timeParts[0], timeParts[1], 0) + newDate
}

function getMonthName(month) {
    const monthNames = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
    return monthNames[month]
}

function getTimeList() {
    const hours = [];
    let count = 0
    for (let i = 0; i < 24; i++) {
        hours.push({ id: ++count, label: (i < 10 ? "0" : "") + i + ":00" });
        hours.push({ id: ++count, label: (i < 10 ? "0" : "") + i + ":30" });
    }
    return hours
}

function getTimeInMs(t) {
    return Number(t.split(':')[0]) * 60 * 1000 + Number(t.split(':')[1]) * 1000;
}

function getCurrentTimeFormat() {
    const today = new Date();
    const hour = today.getHours() <= 10 ? "0" + today.getHours() : today.getHours()
    const time = hour + ":00"
    return time
}

function getIsInSchedule(route) {
    const dayOfWeekDigit = new Date().getDay();
    return route.days.charAt(dayOfWeekDigit) === '1'
}

function getTimeRemainingToArrive(route, siri) {
    const siriData = getTimeDiff(route, siri)
    const time = new Date();
    const current = time.getHours() + ':' + time.getMinutes();

    const now = getTimeInMs(current)
    const start = getTimeInMs(route.first_train)
    const stop = getTimeInMs(route.arrival_time)

    if (now >= start && now <= stop && getIsInSchedule(route) && !siriData) {
        return (`${(stop - now) / 1000} דקות`)
    } else if (now >= start && now <= stop && getIsInSchedule(route) && siriData) {
        return (`${(stop - now) / 1000 + siriData} דקות`)
    } else if (siriData) {
        return (`${siriData} דקות`)
    } else {
        return ''
    }
}

function getdays(days, day) {
    const daysLetters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש',]
    if (days.charAt(day) === '1') return <span className="in-schedule">{daysLetters[day]}</span>
    else if (days.charAt(day) === '0') return <span className="off-schedule">{daysLetters[day]}</span>
}

function getTripLong(route) {
    let start = getTimeInMs(route.arrival_time)
    let end = getTimeInMs(route.arrival_time_a)
    if (((end - start) / 1000) < 0) return 0
    else return (end - start) / 1000
}

function getTimeDiff(route, siri) {
    if (!siri?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedArrivalTime) return
    let { train_no, route_id, direction_id } = route
    const directionRef = direction_id === '1' ? 2 : direction_id === '0' ? 1 : direction_id === '0' ? 3 : direction_id

    let time = new Date(siri.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime)
    time = time.toLocaleTimeString('HE-il', { hour: 'numeric', minute: 'numeric' })
    time = getTimeInMs(time)

    if (siri.MonitoredVehicleJourney.LineRef == route_id &&
        siri.MonitoredVehicleJourney.PublishedLineName == train_no &&
        siri.MonitoredVehicleJourney.DirectionRef == (directionRef)) {

        let arrival_time = getTimeInMs(route.arrival_time)
        return (time - arrival_time) / 1000
    }

}

function getTime(date) {
    const time = new Date(date)
    const now = new Date();
    return time.toLocaleTimeString('HE-il', { hour: 'numeric', minute: 'numeric' })
}