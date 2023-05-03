import * as React from "react";
import MenuItem from "@mui/material/MenuItem";

export const MainMenuItem = (props) => {
  const handleClose = (event) => props.handleCloseMenu(event, props.menu);
  return <MenuItem onClick={handleClose}>{props.menu.name}</MenuItem>;
};
