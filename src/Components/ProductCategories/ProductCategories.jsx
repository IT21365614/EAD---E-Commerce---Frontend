import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";

const ProductManagement = () => {
  // Define the state to manage the switches for each product category
  const [productCategories, setProductCategories] = useState([
    { id: 1, name: "Product Category 01", isActive: true },
    { id: 2, name: "Product Category 02", isActive: true },
    { id: 3, name: "Product Category 03", isActive: true },
  ]);

  // State to manage modal visibility and input
  const [show, setShow] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Toggle the switch state for a specific product category
  const handleSwitchToggle = (id) => {
    setProductCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id
          ? { ...category, isActive: !category.isActive }
          : category
      )
    );
  };

  // Function to handle showing the modal
  const handleShow = () => {
    setNewCategoryName(""); // Reset the input field for new category
    setShow(true);
  };

  // Function to handle closing the modal
  const handleClose = () => setShow(false);

  // Function to handle creating a new product category
  const handleCreateCategory = () => {
    const newCategory = {
      id: productCategories.length + 1, // Generate a new ID
      name: newCategoryName,
      isActive: true,
    };
    setProductCategories((prevCategories) => [...prevCategories, newCategory]);
    handleClose(); // Close the modal
  };

  return (
    <div className="container mt-4">
      <Card className="shadow">
        <Card.Body>
          <Card.Title
            className="text-center mb-4"
            style={{ fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Product Categories
          </Card.Title>
          <Button variant="success" onClick={handleShow} className="mb-3">
            Create Category
          </Button>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Product Category ID</th>
                <th scope="col">Product Category Name</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {productCategories.map((category) => (
                <tr key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td className="text-center">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`switch-${category.id}`}
                        checked={category.isActive}
                        onChange={() => handleSwitchToggle(category.id)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`switch-${category.id}`}
                      >
                        {category.isActive
                          ? "Category Active"
                          : "Category Inactive"}
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>

      {/* Modal for Creating New Category */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Product Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateCategory}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductManagement;
