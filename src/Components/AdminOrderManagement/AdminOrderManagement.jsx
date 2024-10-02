import React, { useState } from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      productId: "P001",
      productName: "Product 01",
      quantity: 5,
      isDelivered: false,
    },
    {
      id: 2,
      productId: "P002",
      productName: "Product 02",
      quantity: 3,
      isDelivered: false,
    },
    {
      id: 3,
      productId: "P003",
      productName: "Product 03",
      quantity: 10,
      isDelivered: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [cancelNote, setCancelNote] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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

  // Open the cancel order dialog
  const handleCancelOrderClick = (id) => {
    setSelectedOrderId(id);
    setShowModal(true);
  };

  // Handle the cancellation with the provided note
  const handleCancelOrderConfirm = () => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== selectedOrderId)
    );
    console.log(
      `Order ID ${selectedOrderId} canceled with note: ${cancelNote}`
    );
    setShowModal(false);
    setCancelNote("");
  };

  return (
    <div className="container mt-4">
      <Card className="shadow">
        <Card.Body>
          <Card.Title
            className="text-center mb-4"
            style={{ fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Admin - Pending Orders
          </Card.Title>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Product List</th>
                <th scope="col">Status</th>
                <th scope="col" className="align-middle text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <th scope="row">{order.id}</th>
                  <td>{order.productName}</td>
                  <td className="text-start">
                    {/* <div className="form-check form-switch me-3">
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
                    </div> */}
                    <div className="form-check form-switch ">
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
                  <td className="align-middle text-center">
                    <Button
                      variant="danger"
                      onClick={() => handleCancelOrderClick(order.id)}
                      size="sm"
                    >
                      Cancel Order
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>

      {/* Modal for cancel note */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Cancelation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Cancelation Note</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Cancelation Note"
                value={cancelNote}
                onChange={(e) => setCancelNote(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={handleCancelOrderConfirm}
            disabled={!cancelNote.trim()}
          >
            Confirm Cancelation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminOrderManagement;
