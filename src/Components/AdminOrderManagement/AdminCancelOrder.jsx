import React, { useEffect, useState } from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";
import apiDefinitions from "../../api/apiDefinitions";
import { toast } from "react-toastify";
import { api } from "../../api/api";
import Swal from "sweetalert2";

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    apiDefinitions.adminCancelOrderList().then((response) => {
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

  // Open the cancel order dialog
  const handleCancelOrderClick = (id) => {
    setSelectedOrderId(id);
    setShowModal(true);
  };

  // Handle the cancellation with the provided note
  const handleCancelOrderConfirm = () => {
    setShowModal(false);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleCancel();
      }
    });
    setCancelNote("");
  };

  const handleCancel = () => {
    const payload = {
      cancelNote: cancelNote,
    };

    apiDefinitions.cancelOrder(selectedOrderId, payload).then((response) => {
      try {
        if (response.status === 200) {
          console.log(response.data);
          setRefresh(!refresh);
          toast.success("Order Cancelled Successfully");
        } else {
          console.log("Failed to cancel order");
          toast.error("Products have ready status");
        }
      } catch {
        console.log("Failed to cancel order");
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
            Admin - Cancel Orders
          </Card.Title>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Order Date</th>
                <th scope="col">Total Price (Rs.)</th>
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
                  <td>{order.totalAmount}</td>
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
          <Button variant="danger" onClick={handleCancelOrderConfirm}>
            Confirm Cancelation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminOrderManagement;
