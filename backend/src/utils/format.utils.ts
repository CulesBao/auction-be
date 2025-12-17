export const currencyFormatter = (locale = "vi-VN", currency = "VND") =>
  new Intl.NumberFormat(locale, { style: "currency", currency });

export const formatCurrency = (
  value?: number | null,
  locale = "vi-VN",
  currency = "VND",
) => {
  if (value == null) return "—";
  return currencyFormatter(locale, currency).format(value);
};

export const formatDateTime = (d?: Date | string, locale = "vi-VN") => {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString(locale, { hour12: false });
  } catch (e) {
    return String(d);
  }
};

export const sum = (arr: any[], selector: (x: any) => number) =>
  arr.reduce((s, i) => s + (selector(i) || 0), 0);
