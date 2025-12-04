import { useMemo } from "react";
import { Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StatBox from "../../../components/StatBox";

const stats = (colors) => [
  {
    key: "emails",
    title: "12,361",
    subtitle: "Emails Sent",
    progress: "0.75",
    increase: "+14%",
    icon: (
      <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
    ),
  },
  {
    key: "sales",
    title: "431,225",
    subtitle: "Sales Obtained",
    progress: "0.50",
    increase: "+21%",
    icon: (
      <PointOfSaleIcon
        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
      />
    ),
  },
  {
    key: "clients",
    title: "32,441",
    subtitle: "New Clients",
    progress: "0.30",
    increase: "+5%",
    icon: (
      <PersonAddIcon
        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
      />
    ),
  },
  {
    key: "traffic",
    title: "1,325,134",
    subtitle: "Traffic Received",
    progress: "0.80",
    increase: "+43%",
    icon: (
      <TrafficIcon
        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
      />
    ),
  },
];

const StatsRow = ({ colors }) => {
  const items = useMemo(
    () => stats(colors),
    // Optimisation Lighthouse (Phase 2) : évite de recréer la config statique à chaque rendu
    [colors]
  );

  return items.map((stat) => (
    <Box
      key={stat.key}
      gridColumn="span 3"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StatBox
        title={stat.title}
        subtitle={stat.subtitle}
        progress={stat.progress}
        increase={stat.increase}
        icon={stat.icon}
      />
    </Box>
  ));
};

export default StatsRow;
