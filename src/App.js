import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./Components/LoginSignUp/LoginSignUp";
// import Home from "./Components/Home/Home";
import ProductManagement from "./Components/ProductCategories/ProductCategories";
import ProductCategories from "./Components/ProductCategories/ProductCategories";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProductList from "./Components/ProductList/ProductList";
import OrderManage from "./Components/OrderManage/OrderManage";
import VendorManagement from "./Components/VendorManagement/VendorManagement";
import AdminOrderManagement from "./Components/AdminOrderManagement/AdminOrderManagement";
import AdminCancelOrder from "./Components/AdminOrderManagement/AdminCancelOrder";

function App() {
  return (
    <Router>
      <div className="App">
        <Dashboard />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/product-categories" element={<ProductCategories />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/order-management" element={<OrderManage />} />
          <Route path="/vendor-management" element={<VendorManagement />} />
          <Route
            path="/admin-cancel-management"
            element={<AdminCancelOrder />}
          />
          <Route
            path="/admin-order-management"
            element={<AdminOrderManagement />}
          />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
