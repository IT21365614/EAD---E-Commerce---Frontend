import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import apiDefinitions from "../../api/apiDefinitions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ProductManagement = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [updateCategoryName, setUpdateCategory] = useState("");
  const [updateId, setUpdateId] = useState("");

  useEffect(() => {
    apiDefinitions
      .getCategoryList()
      .then((res) => {
        if (res.status === 200) {
          setProductCategories(res.data);
        } else {
          toast.error("Error fetching categories.");
        }
      })
      .catch((error) => {
        console.error("API call error:", error);
        toast.error("An error occurred while fetching categories.");
      });
  }, [refresh]);

  const handleSwitchToggle = (id, status) => {
    if (status) {
      apiDefinitions.disableCategory(id).then((res) => {
        if (res.status === 200) {
          setRefresh(!refresh);
          toast.success("Category Disabled Successfully");
        } else {
          toast.error("Error disabling category.");
        }
      });
    } else {
      apiDefinitions.enableCategory(id).then((res) => {
        if (res.status === 200) {
          setRefresh(!refresh);
          toast.success("Category Enabled Successfully");
        } else {
          toast.error("Error enabling category.");
        }
      });
    }
  };

  const handleShow = () => {
    setNewCategoryName("");
    setShow(true);
  };

  const handleShowUpdate = () => {
    setUpdateCategory("");
    setShowUpdate(true);
  };

  const handleUpdate = (id, name) => {
    setUpdateCategory(name);
    setUpdateId(id);
    handleShowUpdate();
  };

  const handleClose = () => setShow(false);
  const handleUpdateClose = () => setShowUpdate(false);

  const handleCreateCategory = () => {
    const payload = { categoryName: newCategoryName };

    apiDefinitions
      .createCategory(payload)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Category Created Successfully");
          setRefresh(!refresh);
        } else {
          toast.error("Error creating category.");
        }
      })
      .catch((error) => {
        console.error("API call error:", error);
        toast.error("An error occurred while creating the category.");
      });

    handleClose();
  };

  const handleUpdateCategory = () => {
    const payload = { categoryName: updateCategoryName };

    apiDefinitions
      .updateCategory(updateId, payload)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Category Updated Successfully");
          setRefresh(!refresh);
        } else {
          toast.error("Error updating category.");
        }
      })
      .catch((error) => {
        console.error("API call error:", error);
        toast.error("An error occurred while updating the category.");
      });

    handleUpdateClose();
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Do You Want To Delete This Category?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      } else if (result.isDenied) {
        Swal.fire("Deletion Was Cancelled");
      }
    });
  };

  const handleDelete = (id) => {
    apiDefinitions
      .deleteCategory(id)
      .then((res) => {
        if (res.status === 204) {
          Swal.fire("Category Was Deleted Successfully");
          setRefresh(!refresh);
        } else {
          Swal.fire("Error Deleting Category");
        }
      })
      .catch((error) => {
        console.error("API call error:", error);
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
                        onChange={() =>
                          handleSwitchToggle(category.id, category.activeStatus)
                        }
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
                      onClick={() =>
                        handleUpdate(category.id, category.categoryName)
                      }
                    >
                      Update
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      style={{ marginLeft: "10px" }}
                      onClick={() => confirmDelete(category.id)}
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

      {/* Create Category Modal */}
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

      {/* Update Category Modal */}
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
                onChange={(e) => setUpdateCategory(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateCategory}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductManagement;
