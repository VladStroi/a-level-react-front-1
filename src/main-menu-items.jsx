import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MainMenuItem from "./main-menu-item";
import { useState } from "react";
import { useNavigate } from "react-router";

const pages = [
    { name: "Products", path: "/" },
    { name: "Category", path: "/categories" },
    { name: "Currency", path: "/currency" },
]

export default function MainMenuItems() {
  const [anchorMenu, setAnchorMenu] = useState(null);

  const navigate = useNavigate()

  const open = Boolean(anchorMenu);

  const handleClickMenu = (event, menuItem) => {
    setAnchorMenu(event.currentTarget);
    if (menuItem) navigate(menuItem.path)
};
const handleCloseMenu = (event, select) => {
    setAnchorMenu(null);
    if (select) navigate(select.path)
  };
  
  return (
    <>
      <MenuIcon
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClickMenu}
      ></MenuIcon>
      <Menu
        id="basic-menu"
        anchorEl={anchorMenu}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
       {pages.map((page) => {
        return <MainMenuItem handleCloseMenu={handleCloseMenu} menu={page} key={page.name}/>
            
       })}
      </Menu>
    </>
  );
}
