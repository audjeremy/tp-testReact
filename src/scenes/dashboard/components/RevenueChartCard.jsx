import { lazy, Suspense } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

// Optimisation Lighthouse (Phase 2) : lazy-load du chart pour alléger le bundle initial
const LineChart = lazy(() => import("../../../components/LineChart"));

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

const RevenueChartCard = ({ colors }) => (
  <Box
    gridColumn="span 8"
    gridRow="span 2"
    backgroundColor={colors.primary[400]}
  >
    <Box
      mt="25px"
      p="0 30px"
      display="flex "
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
          Revenue Generated
        </Typography>
        <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
          $59,342.32
        </Typography>
      </Box>
      <Box>
        <IconButton>
          <DownloadOutlinedIcon
            sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
          />
        </IconButton>
      </Box>
    </Box>
    <Box height="250px" m="-20px 0 0 0">
      <Suspense fallback={<ChartFallback colors={colors} />}>
        <LineChart isDashboard />
      </Suspense>
    </Box>
  </Box>
);

export default RevenueChartCard;
