import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Page/Dashboard";
import Products from "./Page/Products";
import Customers from "./Page/Customers";
import Sales from "./Page/Sales";
import Navigation from "./Components/Navigation";
import Orders from "./Page/Orders";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;
