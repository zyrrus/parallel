export const getQueryOrDefault = (
  value: string | string[] | undefined,
  fallback: string
): string => {
  const singleValue = Array.isArray(value) ? value[0] : value;
  return singleValue ?? fallback;
};
