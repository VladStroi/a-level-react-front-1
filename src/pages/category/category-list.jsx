import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertTitle, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import { stateValues } from '../../common/state-values';
import { fetchCategory } from './category-list-slice';
import Table from './table';

export const CategoryList = () => {
  const { status, categories, error } = useSelector(state => state.categoriesList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === stateValues.idle) {
      // TODO: fix reduntand fetchCategory call
      dispatch(fetchCategory());
    }
  }, [dispatch, status]);

  const content = (() => {
    switch (status) {
      case stateValues.loading:
        return <LinearProgress />;
      case stateValues.succeeded:
        return <Table categories={categories} />;
      case stateValues.failed:
        return (
          <Alert severity="error">
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
      <Typography variant="h3">Category List</Typography>
      <section>{content}</section>
    </article>
  );
};
