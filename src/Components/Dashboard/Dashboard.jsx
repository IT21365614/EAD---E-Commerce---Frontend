import React, { useEffect, useState, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import apiDefinitions from "../../api/apiDefinitions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [vendorId, setVendorID] = useState("");
  const [role, setRole] = useState("");
  const [notifications, setNotifications] = useState([]);
  const notificationIconRef = useRef(null);
  const profileIconRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setVendorID(user.id);
      setRole(user.role);
      console.log("Vendor ID: ", user.id, "Role: ", user.role);
    }
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleOrderDropdown = () =>
    setIsOrderDropdownOpen(!isOrderDropdownOpen);
  const toggleNotificationDropdown = () =>
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("userData"); 
    navigate("/login"); 
  };

  useEffect(() => {
    if (vendorId && role === "Vendor") {
      console.log("Fetching notifications for Vendor ID:", vendorId); 
      apiDefinitions
        .lowStockNotification(vendorId)
        .then((response) => {
          console.log("Notification API response:", response);
          if (response.status === 200) {
            setNotifications([response.data]); 
            console.log("Notifications state updated:", [response.data]); 
          } else {
            toast.error("Failed to get notifications");
          }
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error); 
          toast.error("Failed to get notifications");
        });
    }
  }, [vendorId, role]);

  const handleMarkAsRead = (id) => {
    const payload = {
      id: "string",
      createdTime: "2024-10-06T17:32:21.757Z",
      vendorId: "string",
      message: "string",
      markRead: true,
    };

    apiDefinitions
      .changeMarkAsRead(id, payload)
      .then((response) => {
        if (response.status === 200) {
          console.log("Marked as read:", response.data);
        } else {
          toast.error("Failed to mark as read");
        }
      })
      .catch((error) => {
        console.error("Error marking as read:", error);
        toast.error("Failed to mark as read");
      });
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
          {role === "Admin" ? (
            <>
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
                  className={`dropdown-menu ${
                    isOrderDropdownOpen ? "show" : ""
                  }`}
                  aria-labelledby="orderManagementDropdown"
                >
                  <a className="dropdown-item" href="/admin-order-management">
                    Admin Order List
                  </a>
                  <a className="dropdown-item" href="/admin-cancel-management">
                    Cancel Orders
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
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
                  className={`dropdown-menu ${
                    isOrderDropdownOpen ? "show" : ""
                  }`}
                  aria-labelledby="orderManagementDropdown"
                >
                  <a className="dropdown-item" href="/order-management">
                    Vendor Order List
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="ml-auto d-flex align-items-center">
          {role === "Vendor" && (
            <>
              <a
                className="nav-item nav-link"
                onClick={toggleNotificationDropdown}
                ref={notificationIconRef}
              >
                <i
                  className="bi bi-bell"
                  style={{
                    fontSize: "20px",
                    color: "white",
                    marginLeft: "30px",
                  }}
                ></i>
              </a>
              {isNotificationDropdownOpen && (
                <div
                  className="dropdown-menu show"
                  aria-labelledby="notificationDropdown"
                  style={{
                    position: "absolute",
                    zIndex: 1000,
                    width: "300px",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    top:
                      notificationIconRef.current?.getBoundingClientRect()
                        .bottom +
                      window.scrollY +
                      "px", 
                    left:
                      notificationIconRef.current?.getBoundingClientRect()
                        .left -
                      250 +
                      "px",
                  }}
                >
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="card mb-2"
                        style={{
                          padding: "15px",
                          backgroundColor: notification.markRead
                            ? "#ffffff"
                            : "#ffffe0",
                          borderRadius: "8px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          cursor: "pointer",
                        }}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <div className="card-body">
                          <h6 className="card-title text-primary">
                            Notification
                          </h6>
                          <p className="card-text" style={{ margin: 0 }}>
                            {notification.message}
                          </p>
                          <small className="text-muted">
                            {new Date(
                              notification.createdTime
                            ).toLocaleString()}
                          </small>
                        </div>
                      </div>
                    ))
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
              )}
            </>
          )}

          <a
            className="nav-item nav-link"
            onClick={toggleProfileDropdown}
            ref={profileIconRef} 
          >
            <i
              className="bi bi-person-circle"
              style={{ fontSize: "20px", color: "white", marginLeft: "30px" }}
            ></i>
          </a>
          {isProfileDropdownOpen && (
            <div
              className="dropdown-menu show"
              aria-labelledby="profileDropdown"
              style={{
                position: "absolute",
                zIndex: 1000,
                padding: "10px",
                backgroundColor: "#f8f9fa",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                top:
                  profileIconRef.current?.getBoundingClientRect().bottom +
                  window.scrollY +
                  "px",
                left:
                  profileIconRef.current?.getBoundingClientRect().left -
                  100 +
                  "px",
              }}
            >
              <a
                className="dropdown-item"
                onClick={handleLogout}
                style={{
                  cursor: "pointer",
                }}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Dashboard;
