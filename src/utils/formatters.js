export function formatCurrency(amount, { locale = 'en-CA', currency = 'CAD' } = {}) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    throw new TypeError('amount must be a finite number')
  }
  try {
  
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    // fallback simple si Intl échoue (rare)
    return `${amount.toFixed(2)} ${currency}`
  }
}

export function formatPercent(value, { digits = 0 } = {}) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new TypeError('percent must be a number')
  }
  if (value < 0 || value > 1) {
    throw new RangeError('percent must be between 0 and 1')
  }
  const pct = (value * 100).toFixed(digits)
  // On normalise le point décimal et on ajoute le symbole %
  return `${pct}%`
}

export function formatName(first, last) {
  const safe = (s) =>
    (typeof s === 'string' ? s : '')
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .replace(/^\p{Letter}/u, (ch) => ch.toUpperCase()) // capitalise 1re lettre (unicode)
  const f = safe(first)
  const l = safe(last)
  if (f && l) return `${f} ${l}`
  if (f) return f
  if (l) return l
  return ''
}