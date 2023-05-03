import * as React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { MainMenuItems } from './main-menu-items';
import { CurrencyContainer } from './common/currency/currency-container';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MainMenuItems />
          <CurrencyContainer />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            VladStroi Shop
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
