// The Intl.NumberFormat object enables language-sensitive number formatting.

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-GB").format(value)
}
