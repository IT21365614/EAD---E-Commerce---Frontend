import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import apiDefinitions from "../../api/apiDefinitions";
import { toast } from "react-toastify";

const OrderManage = () => {
  // Define the state to manage the orders
  const [orders, setOrders] = useState([]);
  const [vendorID, setVendorID] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setVendorID(user.id);
      console.log("Vendor ID: ", user.id);
    }
  }, []);

  useEffect(() => {
    if (vendorID) {
      apiDefinitions.getProductListingByVendor(vendorID).then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setOrders(response.data);
        } else {
          console.log("Failed to get orders");
          toast.error("Failed to get orders");
        }
      });
    }
  }, [vendorID, refresh]);

  const handleReadyToggle = (id) => {
    console.log("Ready Toggle for: ", id);
    apiDefinitions.productReadyStatus(id).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setRefresh(!refresh);
        toast.success("Order Status Changed Successfully");
      } else {
        console.log("Failed to update ready status");
        toast.error("Failed to update ready status");
      }
    });
  };

  // Toggle the delivered state for a specific order
  const handleDeliveredToggle = (id) => {
    apiDefinitions.productDeliveredStatus(id).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setRefresh(!refresh);
        toast.success("Order Status Changed Successfully");
      } else {
        console.log("Failed to update delivered status");
        toast.error("Failed to update delivered status");
      }
    });
  };

  return (
    <div className="container mt-4">
      <Card className="shadow">
        <Card.Body>
          <Card.Title
            className="text-center mb-4"
            style={{ fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Pending Orders
          </Card.Title>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Product ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <th scope="row">{order.id}</th>
                  <td>{order.productId}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price}</td>
                  <td className="text-start">
                    <div className="form-check form-switch me-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`ready-switch-${order.id}`}
                        checked={order.readyStatus}
                        onChange={() => handleReadyToggle(order.id)}
                        disabled={order.readyStatus}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`ready-switch-${order.id}`}
                      >
                        {order.readyStatus ? "Ready" : "Not Ready"}
                      </label>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`delivered-switch-${order.id}`}
                        checked={order.deliveredStatus}
                        onChange={() => handleDeliveredToggle(order.id)}
                        disabled={order.deliveredStatus}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`delivered-switch-${order.id}`}
                      >
                        {order.deliveredStatus ? "Delivered" : "Not Delivered"}
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderManage;
