import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { useState, useEffect } from "react";
import { AttachMoney } from "@mui/icons-material";

export default function ButtonAppBar(props) {
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [anchorCurrency, setAnchorCurrency] = useState(null);
  
  const open = Boolean(anchorMenu);
  const openCurrency = Boolean(anchorCurrency);
  
  
  
  const handleClickMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };
  const handleClickCurrency = (event) => {
    setAnchorCurrency(event.currentTarget);
  };
  const factoryHandleCloseCurrency = (id) => {
    return () => {
      setAnchorCurrency(null);
      
      const find = currency.find((el) => el.id === id);
      if (find) {
        props.context.setCurrentCurrency(find)
      }
    }
  };
  const [currency, setCurrency] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get("http://localhost:3010/currency");
      setCurrency(result.data.items);
      props.context.setCurrentCurrency(result.data.items[0])
    };
    fetch();
  }, [props.context.setCurrentCurrency]);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
            <MenuItem onClick={handleCloseMenu}>Products</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Category</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Currency</MenuItem>
          </Menu>

          <AttachMoney
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClickCurrency}
          ></AttachMoney>
          <Menu
            id="currency-menu"
            anchorEl={anchorCurrency}
            open={openCurrency}
            onClose={factoryHandleCloseCurrency}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {currency.map((el) => {
              return (
                <MenuItem key={el.id} onClick={factoryHandleCloseCurrency(el.id)}>
                  {el.symbol} {el.name}
                </MenuItem>
              );
            })}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
