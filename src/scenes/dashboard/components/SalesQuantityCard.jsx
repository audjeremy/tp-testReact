import { lazy, Suspense } from "react";
import { Box, Typography } from "@mui/material";

// Optimisation Lighthouse (Phase 2) : lazy-load du chart pour réduire le JS initial
const BarChart = lazy(() => import("../../../components/BarChart"));

const ChartFallback = ({ colors }) => (
  <Box
    height="100%"
    width="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
    color={colors.grey[200]}
  >
    <Typography variant="body2">Loading chart...</Typography>
  </Box>
);

const SalesQuantityCard = ({ colors }) => (
  <Box
    gridColumn="span 4"
    gridRow="span 2"
    backgroundColor={colors.primary[400]}
  >
    <Typography
      variant="h5"
      fontWeight="600"
      sx={{ padding: "30px 30px 0 30px" }}
    >
      Sales Quantity
    </Typography>
    <Box height="250px" mt="-20px">
      <Suspense fallback={<ChartFallback colors={colors} />}>
        <BarChart isDashboard />
      </Suspense>
    </Box>
  </Box>
);

export default SalesQuantityCard;
