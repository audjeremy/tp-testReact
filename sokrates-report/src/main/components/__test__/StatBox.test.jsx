// src/components/__test__/StatBox.test.jsx
import React from 'react'
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../test/renderWithTheme.jsx'
import StatBox from '../StatBox'

describe('StatBox (composant React)', () => {
  it('rend title, subtitle et increase passés en props', () => {
    const props = {
      title: 'Revenue',
      // value n’est pas rendu en texte par ce StatBox
      value: '12,345',
      increase: '+12%',
      subtitle: 'Depuis 30 jours',
    }

    renderWithTheme(<StatBox {...props} />)

    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('+12%')).toBeInTheDocument()
    expect(screen.getByText(/Depuis 30 jours/i)).toBeInTheDocument()
    // on ne vérifie PAS la valeur brute, car elle n’est pas affichée en clair
  })
})