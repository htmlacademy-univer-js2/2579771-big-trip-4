import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export function formatDuration(ms) {
  const d = dayjs.duration(ms);
  const days = d.days();
  const hours = d.hours();
  const minutes = d.minutes();
  let result = '';
  if (days > 0) {
    result += `${days}D `;
  }
  if (hours > 0 || days > 0) {
    result += `${hours}H `;
  }
  result += `${minutes}M`;
  return result;
}

export function formatDateTimeShort(date) {
  return dayjs(date).format('HH:mm');
}

export function formatDateMonthDay(date) {
  return dayjs(date).format('MMM DD');
}

export function formatDateTime(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}


