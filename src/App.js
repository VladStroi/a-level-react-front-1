import "./App.css";
import * as React from "react";
import ProductList from "./pages/product/product-list";
import ButtonAppBar from "./app-bar";
import { useState } from "react";
import { ContextCurrency } from "./context/currency";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import CategoryList from "./pages/category/category-list";



function App() {
  const [currentCurrency, setCurrentCurrency] = useState(null);
  return (
    // <Provider>
    <div className="App">
      <ContextCurrency.Provider value={currentCurrency}>
        <BrowserRouter>
          <ButtonAppBar context={{ currentCurrency, setCurrentCurrency }} />
          <Routes>
            <Route path="" element={<ProductList />}/>
            <Route path="categories" element={<CategoryList />}/>
          </Routes>
          
        </BrowserRouter>
      </ContextCurrency.Provider>
    </div>
    // </Provider>
  );
}

export default App;
