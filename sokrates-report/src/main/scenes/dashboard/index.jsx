import { Box, Button, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatsRow from "./components/StatsRow";
import RevenueChartCard from "./components/RevenueChartCard";
import TransactionsCard from "./components/TransactionsCard";
import CampaignCard from "./components/CampaignCard";
import SalesQuantityCard from "./components/SalesQuantityCard";
import GeographyTrafficCard from "./components/GeographyTrafficCard";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <StatsRow colors={colors} />

        {/* ROW 2 */}
        <RevenueChartCard colors={colors} />
        <TransactionsCard colors={colors} />

        {/* ROW 3 */}
        <CampaignCard colors={colors} />
        <SalesQuantityCard colors={colors} />
        <GeographyTrafficCard colors={colors} />
      </Box>
    </Box>
  );
};

export default Dashboard;
