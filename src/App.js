import "./App.css";
import * as React from 'react';
import ProductList from "./pages/product/product-list";
import ButtonAppBar from "./app-bar";

function App() {
  return (
    <div className="App">
      <ButtonAppBar/>
      <ProductList />
    </div>
  );
}

export default App;
