import React from "react";
import Drawer from "@mui/material/Drawer";
import LeftMenu from "../Nav/LeftMenu";

interface DesktopDrawerProps {
  drawerWidth: number;
}
const DesktopDrawer: React.FC<DesktopDrawerProps> = (props) => {
  const { drawerWidth } = props;
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
      open
    >
      <LeftMenu />
    </Drawer>
  );
};

export default DesktopDrawer;
