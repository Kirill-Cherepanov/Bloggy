const MINUTE = 1000 * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 31;
const YEAR = DAY * 365;

export function formatDate(date_: Date | string) {
  const date = typeof date_ === 'string' ? new Date(date_) : date_;

  const yearsPassed = Math.floor((Date.now() - date.getTime()) / YEAR);
  const monthsPassed = Math.floor((Date.now() - date.getTime()) / MONTH);
  const weeksPassed = Math.floor((Date.now() - date.getTime()) / WEEK);
  const daysPassed = Math.floor((Date.now() - date.getTime()) / DAY);
  const hoursPassed = Math.floor((Date.now() - date.getTime()) / HOUR);
  const minutesPassed = Math.floor((Date.now() - date.getTime()) / MINUTE);

  if (yearsPassed >= 2) {
    return `${yearsPassed} year${hoursPassed % 10 <= 1 ? '' : 's'} ago`;
  }
  if (monthsPassed >= 2) {
    return `${monthsPassed} month${hoursPassed % 10 <= 1 ? '' : 's'} ago`;
  }
  if (weeksPassed >= 3) {
    return `${weeksPassed} week${hoursPassed % 10 <= 1 ? '' : 's'} ago`;
  }
  if (daysPassed >= 2) {
    return `${daysPassed} day${hoursPassed % 10 <= 1 ? '' : 's'} ago`;
  }
  if (hoursPassed >= 2) {
    return `${hoursPassed || 1} hour${hoursPassed % 10 <= 1 ? '' : 's'} ago`;
  }
  return `${minutesPassed || 1} minute${
    minutesPassed % 10 <= 1 ? '' : 's'
  } ago`;
}
