import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertTitle, LinearProgress, Typography } from '@mui/material';

import { stateValues } from '../../common/state-values';
import { fetchProducts } from './grouped-product-list-slice';
import { CollapsibleProductsTable } from './table';

export const GroupedProductsList = () => {
  const { status, error, products } = useSelector(state => state.groupedProducts);
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (status === stateValues.idle) {
        dispatch(fetchProducts());
      }
    },
    [dispatch, status]
  );

  const content = (() => {
    switch (status) {
      case stateValues.loading:
        return <LinearProgress />;
      case stateValues.succeeded:
        return <CollapsibleProductsTable products={products} />;
      case stateValues.failed:
        return (
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        );
      default:
        return <div>Something weng wrong...</div>
    }
  })();

  return (
    <article>
      <section>
        <Typography variant='h3'>Product list</Typography>
        <section>{content}</section>
      </section>
    </article>
  );
};
