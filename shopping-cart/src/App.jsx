import React from "react";
import ProductList from "./components/product-list";
import CartDrawer from "./components/cart-drawer";
import { FilterBar } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100 flex flex-col gap-2 items-start justify-start p-5">
              <FilterBar />

              <div className="w-full h-full p-4 grid grid-cols-5 gap-2">
                {/* products list */}
                <ProductList />

                {/* cart list */}
                <CartDrawer />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
