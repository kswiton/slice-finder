import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import { useQuery } from "react-query";
import { Button, Paper } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");

  const {
    isLoading,
    error,
    data,
    refetch: refetchPizza,
  } = useQuery(
    "pizza",
    async () => {
      const response = await axios("/api/place");
      console.log(response);
    },
    { enabled: false }
  );

  const successCallback = (position: any) => {
    console.log(position);
  };

  const errorCallback = (error: any) => {
    console.log(error);
  };

  const search = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };
  return (
    <Box
      sx={{
        backgroundColor: "#2196f3",
        background: "linear-gradient(160deg, #2196f3 0%, #1769aa 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="location">Your location</InputLabel>
          <OutlinedInput
            id="location"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={search} edge="end">
                  <LocationOnIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Your location"
          />
        </FormControl>
        <Button onClick={() => refetchPizza()} variant="contained">
          Search
        </Button>
      </Paper>
    </Box>
  );
};

export default HomePage;
