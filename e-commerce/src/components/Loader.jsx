import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "80vh ",
        justifyContent: "center",
        gap:"5rem"
      }}
    >
      <CircularProgress />
      <Typography variant="span">Loading Please Wait...</Typography>
    </Box>
  );
};

export default Loader;
