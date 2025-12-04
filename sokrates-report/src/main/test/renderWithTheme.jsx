// src/test/renderWithTheme.jsx
// But: wrapper tous nos composants MUI dans un ThemeProvider pour les tests.

import React from 'react'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import { render } from '@testing-library/react'

// Petit thème par défaut (suffisant pour les tests)
const testTheme = createTheme()

export function renderWithTheme(ui) {
  return render(
    <ThemeProvider theme={testTheme}>
      <CssBaseline />
      {ui}
    </ThemeProvider>
  )
}