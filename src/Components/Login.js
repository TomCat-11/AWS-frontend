import React from 'react';
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  return (
    <Container
      fluid
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Gesture (Logo or Image) */}
      <Row className="mb-4">
        <Col>
          <Image
            src="./Images/logo.jpeg"
            alt="Welcome Gesture"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            fluid
          />
        </Col>
      </Row>

      {/* Buttons Section (Side by Side) */}
      <Row>
      <Col md={6} className="mb-3">
        <Button
          variant="success"
          size="lg"
          style={{ width: "100%", padding: "10px", fontWeight: "bold" }}
          onClick={() => navigate('/register')}
        >
          Login
        </Button>
      </Col>
      <Col md={6} className="mb-4">
        <Button
          variant="warning"
          size="lg"
          style={{ width: "100%", padding: "10px", fontWeight: "bold", textAlign: "center" }}
          onClick={() => navigate('/register', { state: { showSignupModal: true } })}
        >
          Signup
        </Button>
      </Col>
    </Row>
    </Container>
  );
};

export default Login
