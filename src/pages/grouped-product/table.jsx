import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Row } from './row';
import { useSelector } from 'react-redux';

export const CollapsibleProductsTable = ({ products }) => {
  const { currentCurrency } = useSelector((state) => state.currency);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <Row key={row.categoryId} row={row} currency={currentCurrency} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};
