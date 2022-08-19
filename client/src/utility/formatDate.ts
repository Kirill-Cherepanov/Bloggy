const HOUR = 1000 * 60 * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 31;
const YEAR = DAY * 365;

export default function formatDate(date: Date) {
  const yearsPassed = Math.floor((Date.now() - date.getTime()) / YEAR);
  const monthsPassed = Math.floor((Date.now() - date.getTime()) / MONTH);
  const weeksPassed = Math.floor((Date.now() - date.getTime()) / WEEK);
  const daysPassed = Math.floor((Date.now() - date.getTime()) / DAY);
  const hoursPassed = Math.floor((Date.now() - date.getTime()) / HOUR);

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
  return `${hoursPassed || 1} hour${hoursPassed % 10 <= 1 ? '' : 's'} ago`;
}
