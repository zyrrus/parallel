import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatDate = (date: Date) => dayjs(date).fromNow();

export const getQueryOrDefault = (
  value: string | string[] | undefined,
  fallback: string
): string => {
  const singleValue = Array.isArray(value) ? value[0] : value;
  return singleValue ?? fallback;
};
