import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { auth } from "../Auth/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-firebase-hooks/auth";

const UserAvatar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [signOut, loading, error] = useSignOut(auth);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };
  return (
    <>
      <IconButton
        id="avatar-button"
        aria-controls={open ? "avatar-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
      >
        <Avatar>H</Avatar>
      </IconButton>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "avatar-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatar;
