import Drawer from "@mui/material/Drawer";
import React from "react";
import LeftMenu from "../Nav/LeftMenu";

interface MobileDrawerProps {
  drawerWidth: number;
  container: any;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = (props) => {
  const { drawerWidth, container, mobileOpen, handleDrawerToggle } = props;
  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      <LeftMenu />
    </Drawer>
  );
};

export default MobileDrawer;
