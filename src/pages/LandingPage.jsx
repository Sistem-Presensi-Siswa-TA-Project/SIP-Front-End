import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';

function LandingPage() {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#">MyBrand</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="bg-light text-dark text-center py-5">
        <Container>
          <h1 className="display-4 fw-bold">Selamat Datang di Website Kami</h1>
          <p className="lead mt-3">Ini adalah landing page demo menggunakan React + Bootstrap.</p>
          <Button variant="primary" size="lg">Mulai Sekarang</Button>
        </Container>
      </section>

      {/* Features */}
      <section id="features" className="py-5">
        <Container>
          <h2 className="text-center mb-4">Fitur Unggulan</h2>
          <Row className="g-4 text-center">
            <Col md={4}>
              <h5>⚡ Cepat</h5>
              <p>Dirancang dengan performa dan efisiensi yang tinggi.</p>
            </Col>
            <Col md={4}>
              <h5>📱 Responsif</h5>
              <p>Tampilan menyesuaikan di semua perangkat.</p>
            </Col>
            <Col md={4}>
              <h5>🔒 Aman</h5>
              <p>Keamanan jadi prioritas utama pada sistem kami.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About */}
      <section id="about" className="bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h3>Tentang Kami</h3>
              <p>
                Kami adalah tim pengembang yang fokus pada solusi web modern dan efisien.
              </p>
              <Button variant="outline-primary">Pelajari Lebih Lanjut</Button>
            </Col>
            <Col md={6}>
              <img
                src="https://via.placeholder.com/500x300"
                className="img-fluid rounded shadow"
                alt="Tentang Kami"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-4">
        <p className="mb-0">&copy; 2025 MyBrand. All rights reserved.</p>
      </footer>
    </>
  );
}

export default LandingPage;