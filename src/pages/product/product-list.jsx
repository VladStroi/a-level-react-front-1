import React, { useEffect, useState } from "react";
import Table from "./table";
import axios from "axios";
// import { ContextCurrency } from "../../context/currency";
import { Typography } from "@mui/material";

function ProductList(props) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mappedProducts, setMappedProducts] = useState([]);

  useEffect(() => {
    const fetchDate = async () => {
      const fetchProducts = await axios.get("http://localhost:3010/product");

      setProducts(fetchProducts.data.items);
    };
    fetchDate();
  }, []);

  useEffect(() => {
    const fetchDate = async () => {
      const fetchCategories = await axios.get("http://localhost:3010/category");

      setCategories(fetchCategories.data.items);
    };
    fetchDate();
  }, []);


  useEffect(() => {
    if (products.length && categories.length) {
      const newProducts = products.map((el) => {
        const id = el.category;
        const category = categories.find(
          (findElement) => findElement.id === id
        );
        return { ...el, category };
      });
      setMappedProducts(newProducts);
    }
  }, [products, categories]);
  return (
    <article>
      <section>
        <Typography variant="h3">Poduct list</Typography>
        <Table products={mappedProducts} categories={categories}></Table>
      </section>
    </article>
  );
}

export default ProductList;
