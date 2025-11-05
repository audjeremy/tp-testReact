export function filterUsersByRole(list, role) {
  if (!Array.isArray(list) || typeof role !== 'string' || !role.trim()) return []
  return list.filter(item => item && item.role === role)
}

export function sortByKey(items, key, dir = 'asc') {
  if (!Array.isArray(items)) return []
  if (!items.length) return []
  if (typeof key !== 'string' || !key) return [...items] // renvoie une copie telle quelle

  const sign = dir === 'desc' ? -1 : 1
  // on copie pour ne pas muter l’original
  const copy = [...items]
  copy.sort((a, b) => {
    const va = a?.[key]
    const vb = b?.[key]
    // si la clé n'existe pas, on considère égalité
    if (va == null && vb == null) return 0
    if (va == null) return 1  // valeurs nulles en bas
    if (vb == null) return -1
    if (va < vb) return -1 * sign
    if (va > vb) return 1 * sign
    return 0
  })
  return copy
}

export function topNBy(items, key, n) {
  if (!Array.isArray(items) || !items.length) return []
  if (typeof n !== 'number' || n <= 0) return []
  if (typeof key !== 'string' || !key) return []

  // tri desc par défaut pour "top"
  const sorted = sortByKey(items, key, 'desc')
  return sorted.slice(0, n)
}