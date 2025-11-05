import { describe, it, expect } from 'vitest'
import { filterUsersByRole, sortByKey, topNBy } from '../filters'

// Jeu de données simple et stable pour nos tests
const USERS = [
  { id: 1, name: 'Alice', role: 'admin', score: 80 },
  { id: 2, name: 'Bob', role: 'user',  score: 95 },
  { id: 3, name: 'Cara', role: 'user',  score: 70 },
  { id: 4, name: 'Dan',  role: 'admin', score: 50 },
]

// ---------- filterUsersByRole ----------
describe('filterUsersByRole', () => {
  it('retourne seulement les users du rôle demandé (cas nominal)', () => {
    // Arrange
    const role = 'admin'
    // Act
    const out = filterUsersByRole(USERS, role)
    // Assert
    expect(out).toEqual([
      { id: 1, name: 'Alice', role: 'admin', score: 80 },
      { id: 4, name: 'Dan',  role: 'admin', score: 50 },
    ])
  })

  it('retourne [] si aucun élément ne correspond (variante)', () => {
    const out = filterUsersByRole(USERS, 'manager')
    expect(out).toEqual([])
  })

  it('gère valeurs invalides en entrée (limite): tableau vide si list/role invalides', () => {
    expect(filterUsersByRole(null, 'admin')).toEqual([])
    expect(filterUsersByRole(USERS, null)).toEqual([])
  })
})

// ---------- sortByKey ----------
describe('sortByKey', () => {
  it('tri ascendant par clé numérique (cas nominal)', () => {
    // Arrange
    const items = [...USERS] // copie pour ne pas muter l’original
    // Act
    const out = sortByKey(items, 'score', 'asc')
    // Assert (scores croissants: 50,70,80,95)
    expect(out.map(x => x.score)).toEqual([50, 70, 80, 95])
  })

  it('tri descendant par clé numérique', () => {
    const out = sortByKey([...USERS], 'score', 'desc')
    expect(out.map(x => x.score)).toEqual([95, 80, 70, 50])
  })

  it('retourne [] si items invalide / clé absente (limite)', () => {
    expect(sortByKey(null, 'score', 'asc')).toEqual([])
    expect(sortByKey([], 'score', 'asc')).toEqual([])
    // clé inexistante → rien à trier => on peut choisir de renvoyer une copie vide ou l’original vide
    expect(sortByKey([{ a: 1 }], 'score', 'asc')).toEqual([{ a: 1 }]) // choix : on renvoie une copie telle quelle
  })
})

// ---------- topNBy ----------
describe('topNBy', () => {
  it('retourne les N meilleurs selon la clé (cas nominal)', () => {
    // top 2 par score → Bob (95), Alice (80)
    const out = topNBy(USERS, 'score', 2)
    expect(out.map(x => x.name)).toEqual(['Bob', 'Alice'])
  })

  it('si N plus grand que la longueur, retourne tout trié desc', () => {
    const out = topNBy(USERS, 'score', 10)
    expect(out.map(x => x.score)).toEqual([95, 80, 70, 50])
  })

  it('gère entrées invalides (limite): [] si items invalide, N<=0', () => {
    expect(topNBy(null, 'score', 2)).toEqual([])
    expect(topNBy([], 'score', 2)).toEqual([])
    expect(topNBy(USERS, 'score', 0)).toEqual([])
  })
})