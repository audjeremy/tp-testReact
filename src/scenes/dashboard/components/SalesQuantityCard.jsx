import { Box, Typography } from "@mui/material";
import BarChart from "../../../components/BarChart";

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
      <BarChart isDashboard />
    </Box>
  </Box>
);

export default SalesQuantityCard;
