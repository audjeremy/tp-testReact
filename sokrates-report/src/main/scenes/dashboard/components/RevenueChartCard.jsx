import { Box, IconButton, Typography } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LineChart from "../../../components/LineChart";

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
      <LineChart isDashboard />
    </Box>
  </Box>
);

export default RevenueChartCard;
