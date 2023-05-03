import * as React from 'react';
import { GroupedProductsList } from './grouped-product/grouped-product-list';
import { CategoryList } from './category/category-list';
import { ProductsList } from './products/products-list';

export const routes = [
  {
    path: "/",
    name: "Groups",
    content: <GroupedProductsList />,
  },
  {
    path: "/products",
    name: "Products",
    content: <ProductsList />,
  },
  {
    name: "Category",
    path: "/categories",
    content: <CategoryList />,
  },
  {
    name: "Currency",
    path: "/currency",
    content: <div>Not implemented</div>,
  },
];
