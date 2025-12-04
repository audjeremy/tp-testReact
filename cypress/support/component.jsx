import React from "react";
import { mount as cypressMount } from "cypress/react";
import "@testing-library/cypress/add-commands";
import "./commands";
// ... éventuellement d’autres imports générés par Cypress

import { BrowserRouter } from "react-router-dom";
import { ColorModeContext, useMode } from "../../src/theme";

function Providers({ children }) {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <BrowserRouter>
        <div className="app" style={{ background: theme.palette.background.default }}>
          {children}
        </div>
      </BrowserRouter>
    </ColorModeContext.Provider>
  );
}

export function mount(component) {
  return cypressMount(<Providers>{component}</Providers>);
}