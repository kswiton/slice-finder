import React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserAvatar from "./UserAvatar";
import Box from "@mui/material/Box";

interface TopBarProps {
  handleDrawerToggle: () => void;
}

const TopBar: React.FC<TopBarProps> = (props) => {
  const { handleDrawerToggle } = props;
  return (
    <AppBar
      position="fixed"
      sx={{
        // ml: { sm: `${drawerWidth}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Box>
        <UserAvatar />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
