import "./App.css";
import * as React from "react";
import ProductList from "./pages/product/product-list";
import ButtonAppBar from "./app-bar";
import { useState } from "react";
import { ContextCurrency } from "./context/currency";


function App() {
  const [currentCurrency, setCurrentCurrency] = useState(null);

  return (
    <ContextCurrency.Provider value={setCurrentCurrency}>
      <div className="App">
        <ButtonAppBar context={{currentCurrency, setCurrentCurrency}}/>
        <ProductList context={{currentCurrency, setCurrentCurrency}}/>
      </div>
    </ContextCurrency.Provider>
  );
}

export default App;
