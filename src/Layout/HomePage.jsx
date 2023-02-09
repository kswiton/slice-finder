import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const HomePage = () => {
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
      <CircularProgress style={{ color: "white" }} />
    </Box>
  );
};

export default HomePage;
