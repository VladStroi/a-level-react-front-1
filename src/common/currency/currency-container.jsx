import { AttachMoney } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrency, fetchCurrencies } from './currency-slice';
import { stateValues } from '../state-values';

export const CurrencyContainer = () => {
  const {
    status,
    currentCurrency,
    currencies,
  } = useSelector(state => state.currency);
  const dispatch = useDispatch();
  useEffect(
    () => {
      if (status === stateValues.idle) {
        dispatch(fetchCurrencies());
      }
    },
    [status, dispatch]
  );
  const [anchorCurrency, setAnchorCurrency] = useState(null);
  const handleClickCurrency = event => setAnchorCurrency(event.currentTarget);
  const createOnSelectCurrencyHandler = (currency) => () => {
    setAnchorCurrency(null);
    dispatch(changeCurrency(currency));
  };

  const stringifiedCurrentCurrency = currentCurrency
    ? `${currentCurrency.symbol} ${currentCurrency.name}`
    : '';

  return (
    <>
      <AttachMoney
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClickCurrency}
      />
      {stringifiedCurrentCurrency}
      <Menu
        id="currency-menu"
        anchorEl={anchorCurrency}
        open={Boolean(anchorCurrency)}
        onClose={createOnSelectCurrencyHandler}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {currencies.map((currency) => (
          <MenuItem
            key={currency.id}
            onClick={createOnSelectCurrencyHandler(currency)}
          >
            {currency.symbol} {currency.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
};
