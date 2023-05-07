import * as React from 'react';
import { GroupsContainer } from './groups';
import { CategoryContainer } from './category';
import { ProductsContainer } from './products';

export const homePage = {
  path: '/',
  name: 'Home',
  content: <div>
    Welcome to StroiShop.
    TODO: move to separate componen
  </div>,
};

export const routes = [
  homePage,
  {
    path: '/groups',
    name: 'Groups',
    content: <GroupsContainer />,
  },
  {
    path: '/products',
    name: 'Products',
    content: <ProductsContainer />,
  },
  {
    name: 'Category',
    path: '/categories',
    content: <CategoryContainer />,
  },
  {
    name: 'Currency',
    path: '/currency',
    content: <div>Not implemented</div>,
  },
];
