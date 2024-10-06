import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import apiDefinitions from "../../api/apiDefinitions";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [vendorId, setVendorID] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setVendorID(user.id);
      console.log("Vendor ID: ", user.id);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleOrderDropdown = () => {
    setIsOrderDropdownOpen(!isOrderDropdownOpen);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  };

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (vendorId) {
      console.log("Vendor ID: ", vendorId);
      apiDefinitions.lowStockNotification(vendorId).then((response) => {
        console.log(response);
        try {
          if (response.status === 200) {
            console.log(response.data);
            setNotifications(response.data);
          } else {
            console.log("Failed to get notifications");
          }
        } catch (error) {
          console.log("Failed to get notifications");
          toast.error("Failed to get notifications");
        }
      });
    }
  }, [vendorId]);

  const handleMarkAsRead = (id) => {
    console.log("Mark as read for: ", id);

    const payload = {
      id: "string",
      createdTime: "2024-10-06T17:32:21.757Z",
      vendorId: "string",
      message: "string",
      markRead: true,
    };

    try {
      apiDefinitions.changeMarkAsRead(id, payload).then((response) => {
        if (response.status === 200) {
          console.log(response.data);
        } else {
          console.log("Failed to mark as read");
          toast.error("Failed to mark as read");
        }
      });
    } catch (error) {
      console.log("Failed to mark as read");
    }
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
              id="orderManagementDropdown"
              role="button"
              onClick={toggleOrderDropdown}
              aria-haspopup="true"
              aria-expanded={isOrderDropdownOpen ? "true" : "false"}
            >
              Order Management
            </a>
            <div
              className={`dropdown-menu ${isOrderDropdownOpen ? "show" : ""}`}
              aria-labelledby="orderManagementDropdown"
            >
              <a className="dropdown-item" href="/order-management">
                Vendor Order List
              </a>
              <a className="dropdown-item" href="/admin-order-management">
                Admin Order List
              </a>
              <a className="dropdown-item" href="/admin-cancel-management">
                Cancel Orders
              </a>
            </div>
          </div>
          <a className="nav-item nav-link" href="/vendor-management">
            Vendor Management
          </a>
        </div>

        <div className="ml-auto d-flex align-items-center">
          <a className="nav-item nav-link" onClick={toggleNotificationDropdown}>
            <i
              className="bi bi-bell"
              style={{ fontSize: "20px", color: "white", marginLeft: "700px" }}
            ></i>
          </a>
          <div
            className={`dropdown-menu ${
              isNotificationDropdownOpen ? "show" : ""
            }`}
            aria-labelledby="notificationDropdown"
            style={{
              marginTop: "280px",
              right: "20px",
              position: "absolute",
              zIndex: 1000,
              width: "300px",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {notifications ? (
              <div
                className="card mb-2"
                style={{
                  padding: "15px",
                  backgroundColor: notifications.markRead
                    ? "#ffffff"
                    : "#ffffe0", // Light yellow for unread notifications
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleMarkAsRead(notifications.id);
                }}
              >
                <div className="card-body">
                  <h6 className="card-title text-primary">Notification</h6>
                  <p className="card-text" style={{ margin: 0 }}>
                    {notifications.message}
                  </p>
                  <small className="text-muted">
                    {new Date(notifications.createdTime).toLocaleString()}
                  </small>
                  <div className="text-right mt-2">
                    <i
                      className="bi bi-eye-fill"
                      style={{
                        color: "#007bff",
                        fontSize: "18px",
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="dropdown-item text-center"
                style={{
                  padding: "15px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                No new notifications
              </div>
            )}
          </div>
        </div>

        <div className="ml-auto d-flex align-items-center">
          <a className="nav-item nav-link" href="/notifications">
            <i
              className="bi bi-person-circle"
              style={{ fontSize: "20px", color: "white", marginLeft: "30px" }}
            ></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Dashboard;
