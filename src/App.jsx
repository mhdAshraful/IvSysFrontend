import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Loading from "./Components/Loading";
import Dashboard from "./Page/Dashboard";
import Products from "./Page/Products";
import Customers from "./Page/Customers";
import Sales from "./Page/Sales";
import Navigation from "./Components/Navigation";
import Orders from "./Page/Orders";
import { AnimatePresence } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return loading ? (
    <>
      {/* <Leva oneLineLabels flat collapsed /> */}
      <AnimatePresence>
        <Loading
          key="loading-anim"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zindex: 100,
            width: "100vw",
            height: "100vh",
          }}
        />
      </AnimatePresence>
    </>
  ) : (
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
