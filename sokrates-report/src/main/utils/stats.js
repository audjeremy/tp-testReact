export function sum(values) {
  if (!Array.isArray(values) || values.length === 0) return 0
  return values.reduce((acc, v) => (Number.isFinite(v) ? acc + v : acc), 0)
}

export function average(values) {
  if (!Array.isArray(values) || values.length === 0) return 0
  let total = 0
  let count = 0
  for (const v of values) {
    if (Number.isFinite(v)) {
      total += v
      count += 1
    }
  }
  return count === 0 ? 0 : total / count
}

export function growthRate(current, previous) {
  if (!Number.isFinite(current) || !Number.isFinite(previous)) {
    throw new TypeError('current and previous must be finite number')
  }
  if (previous === 0) return null // convention : indéfini => null
  return (current - previous) / previous
}