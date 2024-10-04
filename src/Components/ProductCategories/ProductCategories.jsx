import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import apiDefinitions from "../../api/apiDefinitions";
import { toast } from "react-toastify";

const ProductManagement = () => {
  useEffect(() => {
    console.log("UserData: ", localStorage.getItem("userData"));
  }, []);

  const [productCategories, setProductCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [updateCategoryName, setUpdateCategory] = useState("");

  const handleSwitchToggle = (id, status) => {
    console.log("Switch Toggled for ID: ", id);
    if (status === true) {
      apiDefinitions.disableCategory(id).then((res) => {
        if (res.status === 200) {
          console.log("Response", res.data);
          setRefresh(!refresh);
          toast.success("Category Disabled Successfully");
        } else {
          toast.error("Error");
        }
      });
    } else {
      apiDefinitions.enableCategory(id).then((res) => {
        if (res.status === 200) {
          console.log("Response", res.data);
          setRefresh(!refresh);
          toast.success("Category Enabled Successfully");
        } else {
          toast.error("Error");
        }
      });
    }
  };

  const handleShow = () => {
    setNewCategoryName("");
    setShow(true);
  };

  const handleShowUpdate = () => {
    setNewUpdateCategory("");
    setShowUpdate(true);
  };

  const handleUpdate = (id, name) => {
    setNewUpdateCategory(name);
    console.log("Update Clicked for ID: ", id);
  };

  const handleClose = () => setShow(false);
  const handleUpdateClose = () => setShowUpdate(false);

  useEffect(() => {
    apiDefinitions
      .getCategoryList()
      .then((res) => {
        console.log("Response", res);
        if (res.status === 200) {
          console.log("Response", res.data);
          setProductCategories(res.data);
        } else {
          toast.error("Error");
        }
      })
      .catch((error) => {
        console.error("API call error:", error);
      });
  }, [refresh]);

  const handleCreateCategory = () => {
    const payload = {
      categoryName: newCategoryName,
    };

    apiDefinitions
      .createCategory(payload)
      .then((res) => {
        console.log("Response", res);
        if (res.status === 201) {
          console.log("Response", res.data);
          toast.success("Category Created Successfully");
        } else {
          toast.error("Error");
        }
      })
      .catch((error) => {
        console.error("API call error:", error);
      });

    handleClose();
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
                  Status
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {productCategories.map((category) => (
                <tr key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.categoryName}</td>
                  <td className="text-center">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`switch-${category.id}`}
                        checked={category.activeStatus}
                        onChange={() => handleSwitchToggle(category.id)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`switch-${category.id}`}
                        style={{ marginLeft: "-35px" }}
                      >
                        {category.activeStatus ? "Active" : "Inactive"}
                      </label>
                    </div>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        handleUpdate(category.id, category.categoryName);
                      }}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>

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

      <Modal show={showUpdate} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={updateCategoryName}
                onChange={(e) => setNewUpdateCategory(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateClose}>
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
