import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function GenreTabs({ genres, value, onChange }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={onChange}
        aria-label="genre tabs"
        variant="scrollable"
        scrollButtons="auto"
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: "#34c94b" } }}
      >
        {genres.map((genre, index) => (
          <Tab
            key={genre.key}
            label={genre.label}
            sx={{
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "16px",
              padding: "4px 16px",
              minHeight: "32px",
              color: value === index ? "#34c94b" : "#ffffff",
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default GenreTabs;