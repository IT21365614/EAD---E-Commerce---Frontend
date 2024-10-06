import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import apiDefinitions from "../../api/apiDefinitions";
import { set } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ProductList = () => {
  const [vendorID, setVendorID] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categoryList, setCategoryList] = useState([]);
  const [products, setProducts] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRestock, setOpenRestock] = useState(false);

  const [updateProductName, setUpdateProductName] = useState("");
  const [updateProductId, setUpdateProductId] = useState("");
  const [updateProductDescription, setUpdateProductDescription] = useState("");
  const [updateUnitPrice, setUpdateUnitPrice] = useState("");
  const [updateQuantity, setUpdateQuantity] = useState("");
  const [updateImage, setUpdateImage] = useState("");
  const [updateCategoryId, setUpdateCategoryId] = useState("");

  const [restockQuantity, setRestockQuantity] = useState("");

  useEffect(() => {
    console.log("Update Category ID: ", updateCategoryId);
  }, [updateCategoryId]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setVendorID(user.id);
      console.log("Vendor ID: ", user.id);
    }
  }, []);

  useEffect(() => {
    apiDefinitions.getCategoryList().then((res) => {
      if (res.status === 200) {
        setCategoryList(res.data);
        console.log("Categories: ", res.data);
      } else {
        console.log("Error fetching categories");
      }
    });
  }, []);

  useEffect(() => {
    if (vendorID) {
      apiDefinitions.getProductList(vendorID).then((res) => {
        if (res.status === 200) {
          setProducts(res.data);
        } else {
          console.log("Error fetching products");
        }
      });
    }
  }, [vendorID, refresh]);

  const handleShowCreate = () => {
    setShowCreate(true);
  };

  const handleCreateProduct = () => {
    setShowCreate(false);
    Swal.fire({
      title: "Create Product",
      text: "Are you sure you want to create this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        createProduct();
      } else {
        Swal.fire("Cancelled");
      }
    });
  };

  const createProduct = () => {
    const payload = {
      productName: productName,
      productDescription: productDescription,
      unitPrice: unitPrice,
      quantity: quantity,
      image: image,
      categoryId: categoryId,
      vendorId: vendorID,
    };

    console.log(payload);

    apiDefinitions.createProduct(payload).then((res) => {
      try {
        if (res.status === 201) {
          console.log("Product Created Successfully");
          toast.success("Product Created Successfully");
          setShowCreate(false);
          setRefresh(!refresh);
        } else {
          console.log("Error creating product");
          toast.error("Error creating product");
        }
      } catch (error) {
        console.log("Error creating product");
      }
    });
  };

  const handleUpdate = (productId) => {
    setUpdateProductId(productId);
    setOpenUpdate(true);
    apiDefinitions.getProductById(productId).then((res) => {
      if (productId) {
        if (res.status === 200) {
          console.log("Product: ", res.data);
          setUpdateProductName(res.data.productName);
          setUpdateProductDescription(res.data.productDescription);
          setUpdateUnitPrice(res.data.unitPrice);
          setUpdateImage(res.data.image);
          setUpdateCategoryId(res.data.categoryId);
        } else {
          console.log("Error fetching product");
        }
      }
    });
  };

  const handleUpdateProduct = () => {
    setOpenUpdate(false);

    const payload = {
      productName: updateProductName,
      productDescription: updateProductDescription,
      unitPrice: updateUnitPrice,
      image: updateImage,
      categoryId: updateCategoryId,
      vendorId: vendorID,
    };

    Swal.fire({
      title: "Update Product",
      text: "Are you sure you want to update this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        updateProduct(payload);
      } else {
        Swal.fire("Cancelled");
      }
    });
  };

  const updateProduct = (payload) => {
    console.log(payload);
    apiDefinitions.updateProduct(updateProductId, payload).then((res) => {
      try {
        if (res.status === 200) {
          console.log("Product Updated Successfully");
          toast.success("Product Updated Successfully");
          setRefresh(!refresh);
        } else {
          console.log("Error updating product");
          toast.error("Error updating product");
        }
      } catch (error) {
        console.log("Error updating product");
      }
    });
  };

  const handleProductDelete = (productId) => {
    Swal.fire({
      title: "Delete Product",
      text: "Are you sure you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productId);
      } else {
        Swal.fire("Cancelled");
      }
    });
  };

  const deleteProduct = (productId) => {
    apiDefinitions.deleteProduct(productId).then((res) => {
      try {
        if (res.status === 200) {
          console.log("Product Deleted Successfully");
          toast.success("Product Deleted Successfully");
          setRefresh(!refresh);
        } else {
          console.log("Error deleting product");
          toast.error("Error deleting product");
        }
      } catch (error) {
        console.log("Error deleting product");
      }
    });
  };

  const handleRestock = (productId) => {
    Swal.fire({
      title: "Restock Product",
      text: "Enter the quantity to restock",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Restock",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        restockProduct(productId, result.value);
      } else {
        Swal.fire("Cancelled");
      }
    });
  };

  const restockProduct = (productId, quantity) => {
    const payload = {
      quantity: quantity,
    };

    apiDefinitions.restockProduct(productId, payload).then((res) => {
      try {
        if (res.status === 200) {
          console.log("Product Restocked Successfully");
          toast.success("Product Restocked Successfully");
          setRefresh(!refresh);
        } else {
          console.log("Error restocking product");
          toast.error("Error restocking product");
        }
      } catch (error) {
        console.log("Error restocking product");
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
                <th scope="col">Category Name</th>
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
                  <td>{product.categoryName}</td>
                  <td className="text-center">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => {
                        handleRestock(product.id);
                      }}
                    >
                      Restock
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        handleUpdate(product.id);
                      }}
                      style={{ marginTop: "15px" }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      style={{ marginTop: "15px" }}
                      onClick={() => {
                        handleProductDelete(product.id);
                      }}
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

      <Modal show={showCreate} onHide={() => setShowCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="text"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                as="select"
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  console.log(e.target.value);
                }}
                required
              >
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateProduct}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={openUpdate} onHide={() => setOpenUpdate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={updateProductName}
                onChange={(e) => setUpdateProductName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                value={updateProductDescription}
                onChange={(e) => setUpdateProductDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="text"
                value={updateUnitPrice}
                onChange={(e) => setUpdateUnitPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={updateImage}
                onChange={(e) => setUpdateImage(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                as="select"
                value={updateCategoryId}
                onChange={(e) => setUpdateCategoryId(e.target.value)}
                required
              >
                {/* Render the category list options */}
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenUpdate(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleUpdateProduct();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
