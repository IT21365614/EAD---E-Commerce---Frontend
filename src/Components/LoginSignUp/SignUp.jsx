import React, { useState } from "react"; // Import useState
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../Assets/login-bg.jpg";
import avatarProfile from "../Assets/avatar.jpg";
import { toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import styles for react-toastify

const SignUpPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match."); // Show toast error message
      return;
    }

    // Create payload
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    console.log("Payload:", payload); // You can replace this with your API call
    toast.success("Account created successfully!"); // Show success toast message
  };

  return (
    <div
      className="signup-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6}>
            <Card className="shadow-lg p-4">
              <Card.Body>
                <div className="text-center mb-4">
                  <img
                    src={avatarProfile}
                    alt="Logo"
                    className="mb-4"
                    style={{
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                    }}
                  />
                  <h2>Create an Account</h2>
                  <p className="text-muted">Fill in the details to sign up</p>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail" className="mt-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formBasicConfirmPassword"
                    className="mt-3"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button
                    variant="success"
                    type="submit"
                    className="mt-4 w-100"
                  >
                    Sign Up
                  </Button>

                  <div className="mt-3 text-center">
                    <p>
                      Already have an account?{" "}
                      <a href="/login" className="text-primary">
                        Login here
                      </a>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpPage;
