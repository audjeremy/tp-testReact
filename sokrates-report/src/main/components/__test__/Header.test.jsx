// src/components/__test__/Header.test.jsx
import React from 'react'
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../test/renderWithTheme.jsx'
import Header from '../Header'

describe('Header (composant React)', () => {
  it('rend des titres (headings) visibles', () => {
    // Arrange + Act
    renderWithTheme(<Header />)

    // Assert: il y a au moins un heading rendu par MUI Typography
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThanOrEqual(1)
  })

  it('le premier heading est présent dans le document', () => {
    renderWithTheme(<Header />)

    const [firstHeading] = screen.getAllByRole('heading')
    expect(firstHeading).toBeInTheDocument()
  })
})