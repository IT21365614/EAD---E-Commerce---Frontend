import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const VendorManagement = () => {
  const [productCategories, setProductCategories] = useState([
    { id: 1, name: "Vendor 01" },
    { id: 2, name: "Vendor 02" },
    { id: 3, name: "Vendor 03" },
  ]);

  const [show, setShow] = useState(false);
  const [vendorName, setVendorName] = useState("");

  const handleShow = () => {
    setVendorName("");
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleCreateVendor = () => {
    let isValid = true;

    if (vendorName === "") {
      isValid = false;
      toast.error("Vendor Name is required");
    }

    if (isValid) {
      const payload = {
        name: vendorName,
      };

      console.log(payload);

      handleClose();
    }
  };

  return (
    <div className="container mt-4">
      <Card className="shadow">
        <Card.Body>
          <Card.Title
            className="text-center mb-4"
            style={{ fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Vendor Management
          </Card.Title>
          <Button variant="success" onClick={handleShow} className="mb-3">
            Create Vendor
          </Button>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Vendor ID</th>
                <th scope="col">Vendor Name</th>
              </tr>
            </thead>
            <tbody>
              {productCategories.map((category) => (
                <tr key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateVendor}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VendorManagement;
