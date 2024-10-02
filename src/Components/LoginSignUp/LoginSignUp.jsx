import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginSignUp.css";
import backgroundImage from "../Assets/login-bg.jpg";
import avatarProfile from "../Assets/avatar.jpg";

import apiDefinitions from "../../api/apiDefinitions";

const LoginSignUp = () => {
  const navigate = useNavigate();

  // Function to handle login button click
  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  useEffect(() => {
    apiDefinitions.getAllProduct().then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <div
      className="login-page"
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
                    }} // Adjusted size
                  />
                  <h2>Welcome Back</h2>
                  <p className="text-muted">Please login to your account</p>
                </div>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-4 w-100"
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>

                  <div className="mt-3 text-center">
                    <p>
                      Don't have an account?{" "}
                      <a href="/signup" className="text-primary">
                        Sign up here
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

export default LoginSignUp;
