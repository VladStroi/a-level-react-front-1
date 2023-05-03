import * as React from 'react';
import { Button, TableCell, TableRow } from '@mui/material';

export const ProductRow = ({ product, onAddToCart, currency }) => (
  <TableRow
    key={product.id}
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
    <TableCell component="th" scope="row"> {product.name}</TableCell>
    <TableCell align="center">{currency.symbol} {product.price * currency.exchange_rate}</TableCell>
    <TableCell align="right">{product.amount}</TableCell>
    <TableCell align="right">
      <Button variant="text" onClick={() => onAddToCart(product)}>Buy</Button>
    </TableCell>
  </TableRow>
);
