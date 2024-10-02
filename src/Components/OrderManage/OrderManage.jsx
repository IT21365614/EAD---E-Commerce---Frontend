import React, { useState } from "react";
import { Card } from "react-bootstrap";

const OrderManage = () => {
  // Define the state to manage the orders
  const [orders, setOrders] = useState([
    {
      id: 1,
      productId: "P001",
      productName: "Product 01",
      quantity: 5,
      isReady: true,
      isDelivered: false,
    },
    {
      id: 2,
      productId: "P002",
      productName: "Product 02",
      quantity: 3,
      isReady: false,
      isDelivered: false,
    },
    {
      id: 3,
      productId: "P003",
      productName: "Product 03",
      quantity: 10,
      isReady: true,
      isDelivered: true,
    },
  ]);

  // Toggle the ready state for a specific order
  const handleReadyToggle = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, isReady: !order.isReady } : order
      )
    );
  };

  // Toggle the delivered state for a specific order
  const handleDeliveredToggle = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, isDelivered: !order.isDelivered } : order
      )
    );
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
                  <td className="text-start">
                    <div className="form-check form-switch me-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`ready-switch-${order.id}`}
                        checked={order.isReady}
                        onChange={() => handleReadyToggle(order.id)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`ready-switch-${order.id}`}
                      >
                        {order.isReady ? "Ready" : "Not Ready"}
                      </label>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`delivered-switch-${order.id}`}
                        checked={order.isDelivered}
                        onChange={() => handleDeliveredToggle(order.id)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`delivered-switch-${order.id}`}
                      >
                        {order.isDelivered ? "Delivered" : "Not Delivered"}
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
