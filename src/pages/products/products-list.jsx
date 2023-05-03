import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress, Typography } from '@mui/material';

import { stateValues } from '../../common/state-values';
import { fetchProducts } from './products-slice';
import { ProductsTable, rowsPerPageOptions } from './products-table';

const defaultPagesPerPage = rowsPerPageOptions[0];

export const ProductsList = () => {
  const dispatch = useDispatch();
  const {
    status,
    products,
    totalCount,
  } = useSelector(state => state.productsList);

  useEffect(
    () => {
      if (status === stateValues.idle) {
        dispatch(fetchProducts({ pagination: { skip: 0, take: defaultPagesPerPage } }));
      }
    },
    [dispatch, status]
  );

  const requestProducts = pagination => dispatch(fetchProducts({ pagination }));

  const isLoading = status === stateValues.loading;

  // TODO: error handling
  // TODO: empty products view

  return (
    <article>
      <section>
        <Typography variant='h3'>Product list</Typography>
        {isLoading && <LinearProgress />}
        <ProductsTable
          products={products}
          onChange={requestProducts}
          totalCount={totalCount}
          defaultPagesPerPage={defaultPagesPerPage}
        />
      </section>
    </article>
  );
};
