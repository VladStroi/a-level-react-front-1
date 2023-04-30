import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useState, useEffect } from "react";
import { AttachMoney } from "@mui/icons-material";
import MainMenuItems from "./main-menu-items";

export default function ButtonAppBar(props) {

  const [anchorCurrency, setAnchorCurrency] = useState(null);

  const openCurrency = Boolean(anchorCurrency);

  const handleClickCurrency = (event) => {
    setAnchorCurrency(event.currentTarget);
  };
  const factoryHandleCloseCurrency = (id) => {
    return () => {
      setAnchorCurrency(null);

      const find = currency.find((el) => el.id === id);
      if (find) {
        props.context.setCurrentCurrency(find);
      }
    };
  };
  const [currency, setCurrency] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get("http://localhost:3010/currency");
      setCurrency(result.data.items);
      props.context.setCurrentCurrency(result.data.items[0]);
    };
    fetch();
  }, [props.context.setCurrentCurrency]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <MainMenuItems />
          
          <AttachMoney
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClickCurrency}
          ></AttachMoney>
          {props.context?.currentCurrency?.symbol || ""}{" "}
          {props.context?.currentCurrency?.name || ""}
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
                <MenuItem
                  key={el.id}
                  onClick={factoryHandleCloseCurrency(el.id)}
                >
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
