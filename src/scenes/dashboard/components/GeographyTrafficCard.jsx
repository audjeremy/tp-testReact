import { Box, Typography } from "@mui/material";
import GeographyChart from "../../../components/GeographyChart";

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
      <GeographyChart isDashboard />
    </Box>
  </Box>
);

export default GeographyTrafficCard;
