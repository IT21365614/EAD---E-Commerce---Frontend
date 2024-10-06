import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import apiDefinitions from "../../api/apiDefinitions";
import { set } from "react-hook-form";

const VendorManagement = () => {
  const [productCategories, setProductCategories] = useState([]);

  const [show, setShow] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");

  const [refresh, setRefresh] = useState(false);

  const handleShow = () => {
    setVendorName("");
    setShow(true);
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    apiDefinitions.getVendorList().then((res) => {
      if (res.status === 200) {
        setProductCategories(res.data);
      } else {
        toast.error("Error fetching vendors.");
      }
    });
  }, [refresh]);

  const handleCreateVendor = () => {
    let isValid = true;

    if (vendorName === "") {
      isValid = false;
      toast.error("Vendor Name is required");
    } else if (vendorEmail === "") {
      isValid = false;
      toast.error("Vendor Email is required");
    } else if (vendorPassword === "") {
      isValid = false;
      toast.error("Vendor Password is required");
    }

    if (isValid) {
      const payload = {
        name: vendorName,
        email: vendorEmail,
        password: vendorPassword,
        role: "Vendor",
      };

      console.log(payload);

      apiDefinitions.createVendor(payload).then((res) => {
        try {
          if (res.status === 201) {
            toast.success("Vendor Created Successfully");
            setShow(false);
            setRefresh(!refresh);
          } else {
            toast.error("Error creating vendor.");
          }
        } catch (error) {
          console.error("API call error:", error);
          toast.error("An error occurred while creating vendor.");
        }
      });
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
                <th scope="col">Vendor Email</th>
                <th scope="col">Vendor Name</th>
              </tr>
            </thead>
            <tbody>
              {productCategories.map((category) => (
                <tr key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.email}</td>
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
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Vendor Email</Form.Label>
              <Form.Control
                type="text"
                value={vendorEmail}
                onChange={(e) => setVendorEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Vendor Password</Form.Label>
              <Form.Control
                type="password"
                value={vendorPassword}
                onChange={(e) => setVendorPassword(e.target.value)}
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
