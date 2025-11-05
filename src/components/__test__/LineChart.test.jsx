import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithTheme } from '../../test/renderWithTheme.jsx'

// ⚠️ On MOCK le paquet Nivo pour éviter le rendu SVG complexe
vi.mock('@nivo/line', () => ({
  ResponsiveLine: (props) => (
    <div data-testid="nivo-line" data-props={JSON.stringify(props)} />
  ),
})) // On mock donc le module @nivo/line pour remplacer le vrai ResponsiveLine par un faux composant :

import LineChart from '../LineChart'

describe('LineChart (composant React)', () => {
  it('rend le graphique (test asynchrone avec waitFor)', async () => {
    renderWithTheme(<LineChart isDashboard />)

    //On attend que le composant avec data-testid="nivo-line" soit dans le document
    await waitFor(() => {
      expect(screen.getByTestId('nivo-line')).toBeInTheDocument()
    })
  })
// Test additionnel pour vérifier le re-render avec changement de prop 
  it('supporte la prop isDashboard (re-render sans crash)', async () => {
    const { rerender } = renderWithTheme(<LineChart isDashboard />)

    await waitFor(() =>
      expect(screen.getByTestId('nivo-line')).toBeInTheDocument()
    )

    // Changement de prop, second rendu
    rerender(<LineChart isDashboard={false} />)

    // Attente que le nouveau rendu soit stable
    await waitFor(() =>
      expect(screen.getByTestId('nivo-line')).toBeInTheDocument()
    )
  })
})