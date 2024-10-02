import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./Components/LoginSignUp/LoginSignUp";
import SignUpPage from "./Components/LoginSignUp/SignUp";
// import Home from "./Components/Home/Home";
import ProductManagement from "./Components/ProductCategories/ProductCategories";
import ProductCategories from "./Components/ProductCategories/ProductCategories";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProductList from "./Components/ProductList/ProductList";
import OrderManage from "./Components/OrderManage/OrderManage";

function App() {
  return (
    <Router>
      <div className="App">
        <Dashboard />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/product-categories" element={<ProductCategories />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/order-management" element={<OrderManage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
