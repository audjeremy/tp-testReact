import { Box, Typography, useTheme, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import { TeamListSchema, TeamFilterSchema } from "../../validation/teamSchemas"; import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { useState } from "react";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";


const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [filter, setFilter] = useState("");
  const [filterError, setFilterError] = useState("");
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];
  let rows = [];

  try {
    rows = TeamListSchema.parse(mockDataTeam);
  } catch (err) {
    console.error("Invalid team data", err);
    rows = [];
  }

  // filtre appliqué si pas d'erreur et filtre non vide
  const filteredRows =
    filterError || filter.trim() === ""
      ? rows
      : rows.filter((row) =>
        row.name.toLowerCase().includes(filter.toLowerCase())
      );

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);

    try {
      // validation avec Zod + format des erreurs
      TeamFilterSchema.parse(value);
      setFilterError("");
    } catch (err) {
      const formatted = err.format();
      const msg = formatted._errors?.[0] || "Invalid filter";
      setFilterError(msg);
    }
  };
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />

      {/* 👇 Champ de filtre + erreur */}
      <Box mb="10px" mt="10px">
        <TextField
          label="Filter by name"
          variant="outlined"
          size="small"
          value={filter}
          onChange={handleFilterChange}
          inputProps={{ "aria-label": "team filter" }}
        />
        {filterError && (
          <Typography
            color="error"
            role="alert"
            sx={{ mt: "5px" }}
          >
            {filterError}
          </Typography>
        )}
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          // (ton sx existant)
        }}
      >
        <DataGrid checkboxSelection rows={filteredRows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
