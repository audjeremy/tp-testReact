import { describe, it, expect } from 'vitest'
import { sum, average, growthRate } from '../stats'

// ---------- sum ----------
describe('sum', () => {
  it('additionne une liste de nombres (cas nominal)', () => {
    // Arrange
    const values = [10, 20, 30]
    // Act
    const out = sum(values)
    // Assert
    expect(out).toBe(60)
  })

  it('ignore null/undefined et non-nombres (variante)', () => {
    const out = sum([10, null, 'x', undefined, 5])
    expect(out).toBe(15)
  })

  it('retourne 0 si entrée vide/incorrecte (limite)', () => {
    expect(sum([])).toBe(0)
    expect(sum(null)).toBe(0)
  })
})

// ---------- average ----------
describe('average', () => {
  it('calcule la moyenne des nombres (cas nominal)', () => {
    const out = average([10, 20, 30])
    expect(out).toBe(20)
  })

  it('ignore null/undefined et non-nombres (variante)', () => {
    const out = average([10, null, undefined, 'x', 20])
    expect(out).toBe(15)
  })

  it('retourne 0 si pas de valeurs numériques valides (limite)', () => {
    expect(average([])).toBe(0)
    expect(average([null, 'x'])).toBe(0)
    expect(average(null)).toBe(0)
  })
})

// ---------- growthRate ----------
describe('growthRate', () => {
  it('retourne le taux de croissance (cas nominal)', () => {
    // (120 - 100) / 100 = 0.2
    expect(growthRate(120, 100)).toBe(0.2)
  })

  it('retourne null si previous = 0 (limite)', () => {
    expect(growthRate(100, 0)).toBeNull()
  })

  it('lance une erreur si les entrées ne sont pas des nombres finis (erreurs)', () => {
    expect(() => growthRate('a', 100)).toThrow(/number/i)
    expect(() => growthRate(100, 'b')).toThrow(/number/i)
    expect(() => growthRate(Infinity, 10)).toThrow(/finite/i)
  })
})