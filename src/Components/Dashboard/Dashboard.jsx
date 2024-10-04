import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleOrderDropdown = () => {
    setIsOrderDropdownOpen(!isOrderDropdownOpen);
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/home" style={{ marginLeft: "20px" }}>
        E-Commerce
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link" href="#">
            Home
          </a>
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="productManagementDropdown"
              role="button"
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? "true" : "false"}
            >
              Product Management
            </a>
            <div
              className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
              aria-labelledby="productManagementDropdown"
            >
              <a className="dropdown-item" href="/product-categories">
                Product Categories
              </a>
              <a className="dropdown-item" href="/productList">
                Product List
              </a>
            </div>
          </div>

          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="productManagementDropdown"
              role="button"
              onClick={toggleOrderDropdown}
              aria-haspopup="true"
              aria-expanded={isOrderDropdownOpen ? "true" : "false"}
            >
              Order Management
            </a>
            <div
              className={`dropdown-menu ${isOrderDropdownOpen ? "show" : ""}`}
              aria-labelledby="productManagementDropdown"
            >
              <a className="dropdown-item" href="/order-management">
                Vendor Order List
              </a>
              <a className="dropdown-item" href="/admin-order-management">
                Admin Order List
              </a>
            </div>
          </div>
          <a className="nav-item nav-link" href="/vendor-management">
            Vendor Management
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Dashboard;
