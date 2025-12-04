import { describe, it, expect } from 'vitest'
import { formatCurrency, formatPercent, formatName } from '../formatters' // on les importera quand on créera le fichier formatters.js

describe('formatters (fonctions pures)', () => {
  // ---------- formatCurrency ----------
  it('formatCurrency formate un nombre positif en en-CA CAD', () => {
    // Arrange
    const amount = 1234.56
    // Act
    const out = formatCurrency(amount) // par défaut: locale en-CA, devise CAD
    // Assert
    // On ne fige pas le symbole exact (car dépend de l’OS), mais on vérifie le nombre.
    expect(out).toMatch(/1,234\.56|1 234,56|1 234,56/)
  })

  it('formatCurrency gère 0 correctement', () => {
    const out = formatCurrency(0)
    expect(out).toMatch(/0\.00|0,00/)
  })

  it('formatCurrency lance une erreur si amount n’est pas un nombre fini', () => {
    expect(() => formatCurrency('abc')).toThrow(/finite number/i)
    expect(() => formatCurrency(NaN)).toThrow(/finite number/i)
    expect(() => formatCurrency(Infinity)).toThrow(/finite number/i)
  })

  // ---------- formatPercent ----------
  it('formatPercent formate 0.123 en "12.3%" avec digits:1', () => {
    const out = formatPercent(0.123, { digits: 1 })
    expect(out).toBe('12.3%')
  })

  it('formatPercent gère les bornes 0% et 100%', () => {
    expect(formatPercent(0)).toBe('0%')
    expect(formatPercent(1)).toBe('100%')
  })

  it('formatPercent lance une erreur si hors [0,1] ou non-nombre', () => {
    expect(() => formatPercent(-0.1)).toThrow(/between 0 and 1/i)
    expect(() => formatPercent(1.1)).toThrow(/between 0 and 1/i)
    expect(() => formatPercent('x')).toThrow()
  })

  // ---------- formatName ----------
  it('formatName nettoie espaces et capitalise: "  jean " + "  duPONT " => "Jean Dupont"', () => {
    const out = formatName('  jean ', '  duPONT ')
    expect(out).toBe('Jean Dupont')
  })

  it('formatName renvoie une seule partie si l’autre est vide', () => {
    expect(formatName('', 'dupont')).toBe('Dupont')
    expect(formatName('jean', '')).toBe('Jean')
  })

  it('formatName renvoie "" si tout est vide/indéfini', () => {
    expect(formatName('', '')).toBe('')
    expect(formatName()).toBe('')
  })
})