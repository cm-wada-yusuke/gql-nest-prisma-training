import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

// https://qiita.com/suin/items/296740d22624b530f93a
export function isoStringToJstDate(isoString: string): string {
  const utcDate = parseISO(isoString);
  const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
  return format(jstDate, 'yyyy-MM-dd');
}
