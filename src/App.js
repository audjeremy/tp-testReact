import { useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, CircularProgress, Box } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { ColorModeContext, useMode } from "./theme";

// Optimisation Lighthouse : lazy-load des scènes secondaires et plus lourdes
const Team = lazy(() => import("./scenes/team"));
const Invoices = lazy(() => import("./scenes/invoices"));
const Contacts = lazy(() => import("./scenes/contacts"));
const Bar = lazy(() => import("./scenes/bar"));
const Form = lazy(() => import("./scenes/form"));
const Line = lazy(() => import("./scenes/line"));
const Pie = lazy(() => import("./scenes/pie"));
const FAQ = lazy(() => import("./scenes/faq"));
const Geography = lazy(() => import("./scenes/geography"));
const Calendar = lazy(() => import("./scenes/calendar/calendar"));

const RouteLoader = () => (
  // Optimisation Lighthouse : fallback léger pendant le lazy-loading
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    height="100%"
    padding="20px"
  >
    <CircularProgress size={28} aria-label="Loading content" />
  </Box>
);

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="app"
          data-testid="app-root"
          data-theme-mode={theme.palette.mode}
        >
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Suspense fallback={<RouteLoader />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
