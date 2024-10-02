import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";

const ProductList = () => {
  // State to handle the list of products
  const [products, setProducts] = useState([
    {
      id: 1,
      productName: "Product Category 01",
      productDescription: "Description 01",
      unitPrice: 100,
      quantity: 20,
      image: "image1.jpg",
      categoryId: "001",
    },
    {
      id: 2,
      productName: "Product Category 02",
      productDescription: "Description 02",
      unitPrice: 200,
      quantity: 30,
      image: "image2.jpg",
      categoryId: "002",
    },
    {
      id: 3,
      productName: "Product Category 03",
      productDescription: "Description 03",
      unitPrice: 150,
      quantity: 15,
      image: "image3.jpg",
      categoryId: "003",
    },
  ]);

  // State to handle modal visibility and input
  const [show, setShow] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // New state for create/update mode
  const [currentProduct, setCurrentProduct] = useState({});
  const [updatedProduct, setUpdatedProduct] = useState({});

  // Function to handle showing the modal for updating
  const handleShowUpdate = (product) => {
    setCurrentProduct(product);
    setUpdatedProduct(product); // Set initial values for the update form
    setIsCreating(false); // Set mode to update
    setShow(true);
  };

  // Function to handle showing the modal for creating
  const handleShowCreate = () => {
    setUpdatedProduct({}); // Reset the form for a new product
    setIsCreating(true); // Set mode to create
    setShow(true);
  };

  // Function to handle closing the modal
  const handleClose = () => setShow(false);

  // Function to handle saving the product details
  const handleSave = () => {
    if (isCreating) {
      // If creating a new product, generate a new ID
      const newProduct = { ...updatedProduct, id: products.length + 1 };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } else {
      // If updating, find the current product and update it
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === currentProduct.id ? updatedProduct : p
        )
      );
    }
    handleClose();
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <Card className="shadow">
        <Card.Body>
          <Card.Title
            className="text-center mb-4"
            style={{ fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Product List
          </Card.Title>
          <Button variant="success" onClick={handleShowCreate} className="mb-3">
            Create Product
          </Button>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Description</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Image</th>
                <th scope="col">Category ID</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>{product.productName}</td>
                  <td>{product.productDescription}</td>
                  <td>${product.unitPrice}</td>
                  <td>{product.quantity}</td>
                  <td>{product.image}</td>
                  <td>{product.categoryId}</td>
                  <td className="text-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleShowUpdate(product)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      style={{ marginLeft: "15px" }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>

      {/* Modal for Creating/Updating Product Details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isCreating ? "Create New Product" : "Update Product Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={updatedProduct.productName || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Category ID</Form.Label>
              <Form.Control
                type="text"
                name="categoryId"
                value={updatedProduct.categoryId || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="productDescription"
                value={updatedProduct.productDescription || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="number"
                name="unitPrice"
                value={updatedProduct.unitPrice || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={updatedProduct.quantity || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={updatedProduct.image || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isCreating ? "Create" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
