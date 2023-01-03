// The Intl.NumberFormat object enables language-sensitive number formatting.

export function formatNumber(value) {
  return new Intl.NumberFormat("en-GB").format(value)
}
