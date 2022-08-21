export const utilService = {
    makeId,
    makeLorem,
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
    getExtension,
    getMonthName,
    getTimeList,
    getTimeInMs,
    getCurrentTimeFormat
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
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

function getExtension(filename) {
    try {
        var parts = filename.split('.')
        return _imageOrVideo(parts[parts.length - 1])
    } catch (error) {
        return 'image'
    }
}

function _imageOrVideo(filename) {
    var type = ''
    switch (filename) {
        case 'm4v':
            type = 'video'
            break
        case 'avi':
            type = 'video'
            break
        case 'mpg':
            type = 'video'
            break
        case 'mp4':
            type = 'video'
            break
        case 'mkv':
            type = 'video'
            break
        case 'mov':
            type = 'video'
            break
        case 'jpg':
            type = 'image'
            break
        case 'gif':
            type = 'image'
            break
        case 'bmp':
            type = 'image'
            break
        case 'png':
            type = 'image'
            break
        default:
            type = 'image'
            break
    }
    return type

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

