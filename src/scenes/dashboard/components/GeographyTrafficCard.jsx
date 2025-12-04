import { lazy, Suspense } from "react";
import { Box, Typography } from "@mui/material";

// Optimisation Lighthouse (Phase 2) : lazy-load du chart pour décaler le coût JS
const GeographyChart = lazy(() => import("../../../components/GeographyChart"));

const ChartFallback = ({ colors }) => (
  <Box
    height="100%"
    width="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
    color={colors.grey[200]}
  >
    <Typography variant="body2">Loading map...</Typography>
  </Box>
);

const GeographyTrafficCard = ({ colors }) => (
  <Box
    gridColumn="span 4"
    gridRow="span 2"
    backgroundColor={colors.primary[400]}
    padding="30px"
  >
    <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
      Geography Based Traffic
    </Typography>
    <Box height="200px">
      <Suspense fallback={<ChartFallback colors={colors} />}>
        <GeographyChart isDashboard />
      </Suspense>
    </Box>
  </Box>
);

export default GeographyTrafficCard;
