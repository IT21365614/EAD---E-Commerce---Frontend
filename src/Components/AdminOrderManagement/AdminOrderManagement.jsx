import React, { useEffect, useState } from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";
import apiDefinitions from "../../api/apiDefinitions";
import { toast } from "react-toastify";
import { api } from "../../api/api";

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    apiDefinitions.getAllOrderList().then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setOrders(response.data);
      } else {
        console.log("Failed to get orders");
        toast.error("Failed to get orders");
      }
    });
  }, [refresh]);

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
    console.log("Delivered Toggle for: ", id);
    apiDefinitions.adminProductDeliveryStatus(id).then((response) => {
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

  // Open the cancel order dialog
  const handleCancelOrderClick = (id) => {
    setSelectedOrderId(id);
    setShowModal(true);
  };

  // Handle the cancellation with the provided note
  const handleCancelOrderConfirm = () => {
    
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
                <th scope="col">Order Date</th>
                <th scope="col">Product List</th>
                <th scope="col">Total Price (Rs.)</th>
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
                  <th scope="row">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </th>

                  <td>
                    {order.orderItems.map((item) => item.productId).join(", ")}
                  </td>

                  <td>{order.totalAmount}</td>
                  <td className="text-start">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`delivered-switch-${order.id}`}
                        checked={
                          order.orderStatus === "Delivered"
                            ? true
                            : order.deliveredStatus
                        }
                        onChange={() => handleDeliveredToggle(order.id)}
                        disabled={order.orderStatus === "Delivered"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`delivered-switch-${order.id}`}
                      >
                        {order.orderStatus === "Delivered"
                          ? "Delivered"
                          : order.deliveredStatus
                          ? "Delivered"
                          : "Not Delivered"}
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
