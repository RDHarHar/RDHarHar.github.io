/* Pure conversion helpers shared by the browser UI and Node tests. */
(function (root) {
  'use strict';
  const pad = number => String(number).padStart(2, '0');
  function parts(dateText, timeText) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateText) || !/^\d{2}:\d{2}(:\d{2})?$/.test(timeText)) {
      throw new Error('Enter both a valid date and time.');
    }
    const [year, month, day] = dateText.split('-').map(Number);
    const [hour, minute, second = 0] = timeText.split(':').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    if (year < 1900 || year > 9999 || month < 1 || month > 12 || day < 1 || hour > 23 || minute > 59 || second > 59 || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
      throw new Error('Enter a valid date from 1900 to 9999 and a valid time.');
    }
    return { year, month, day, hour, minute, second, date };
  }
  function fromUTC(dateText, timeText) { return parts(dateText, timeText).date; }
  function fromLocal(dateText, timeText) {
    const p = parts(dateText, timeText);
    const first = new Date(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    const matches = date => date.getFullYear() === p.year && date.getMonth() === p.month - 1 && date.getDate() === p.day && date.getHours() === p.hour && date.getMinutes() === p.minute && date.getSeconds() === p.second;
    if (!matches(first)) throw new Error('This local time does not exist because the clocks move forward. Choose another time.');
    // A repeated wall-clock time can represent more than one instant. Search either
    // side of the browser's default instant instead of assuming a one-hour shift.
    const candidates = [];
    for (let minutes = -26 * 60; minutes <= 26 * 60; minutes++) {
      const candidate = new Date(first.getTime() + minutes * 60000);
      if (matches(candidate)) candidates.push(candidate);
    }
    return candidates;
  }
  function dateValue(date, utc = false) {
    const year = utc ? date.getUTCFullYear() : date.getFullYear();
    const month = utc ? date.getUTCMonth() : date.getMonth();
    const day = utc ? date.getUTCDate() : date.getDate();
    return `${String(year).padStart(4, '0')}-${pad(month + 1)}-${pad(day)}`;
  }
  function timeValue(date, utc = false, seconds = false) {
    return `${pad(utc ? date.getUTCHours() : date.getHours())}:${pad(utc ? date.getUTCMinutes() : date.getMinutes())}${seconds ? ':' + pad(utc ? date.getUTCSeconds() : date.getSeconds()) : ''}`;
  }
  function offsetLabel(date) {
    const offset = -date.getTimezoneOffset();
    return `UTC${offset >= 0 ? '+' : '−'}${pad(Math.floor(Math.abs(offset) / 60))}:${pad(Math.abs(offset) % 60)}`;
  }
  function fromEpoch(text, unit) {
    if (!['seconds', 'milliseconds'].includes(unit)) throw new Error('Choose seconds or milliseconds.');
    const value = String(text).trim();
    if (!/^-?\d+$/.test(value)) throw new Error('Enter a whole-number Unix timestamp, such as 1704067200.');
    const numeric = Number(value);
    const milliseconds = unit === 'seconds' ? numeric * 1000 : numeric;
    const date = new Date(milliseconds);
    if (!Number.isSafeInteger(numeric) || !Number.isSafeInteger(milliseconds) || !Number.isFinite(date.getTime()) || date.getUTCFullYear() < 1900 || date.getUTCFullYear() > 9999) {
      throw new Error('Enter a timestamp between the years 1900 and 9999, and check the selected unit.');
    }
    return date;
  }
  function epochValues(date) {
    return { seconds: Math.floor(date.getTime() / 1000), milliseconds: date.getTime() };
  }
  const api = { fromUTC, fromLocal, fromEpoch, epochValues, dateValue, timeValue, offsetLabel };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.UTCConverter = api;
})(globalThis);
