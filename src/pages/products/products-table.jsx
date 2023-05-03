import * as React from 'react';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { ProductRow } from './products-row';

export const rowsPerPageOptions = [5, 10, 25];

export const ProductsTable = ({ products, onChange, totalCount, defaultPagesPerPage }) => {
  const { currentCurrency } = useSelector((state) => state.currency);
  const [pagesPerPage, setPagesPerPage] = useState(defaultPagesPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const onPageChange = useCallback(
    (_, page) => {
      setCurrentPage(page);
      onChange({
        skip: page * pagesPerPage,
        take: pagesPerPage,
      });
    },
    [onChange, pagesPerPage]
  );

  const onRowsPerPageChange = useCallback(
    ({ target }) => {
      setPagesPerPage(target.value);
      onChange({
        skip: currentPage * pagesPerPage,
        take: target.value,
      });
    },
    [currentPage, onChange, pagesPerPage]
  );

  const onAddToCart = useCallback(
    product => {
      // TODO: not implemented
      console.log(product)
    },
    []
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              currency={currentCurrency}
            />
          ))}
          <TableRow>
            <TablePagination
              rowsPerPage={pagesPerPage}
              page={currentPage}
              count={totalCount}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
              rowsPerPageOptions={[...rowsPerPageOptions, { value: totalCount, label: 'All' }]}
            />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
