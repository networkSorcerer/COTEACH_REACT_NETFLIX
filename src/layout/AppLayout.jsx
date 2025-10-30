import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div style={{ backgroundColor: "#141414", minHeight: "100vh" }}>
      <Navbar
        expand="lg"
        variant="dark"
        style={{
          backgroundColor: "#000",
          borderBottom: "2px solid #e50914",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.6)",
        }}
        className="py-3 px-4"
      >
        <Container fluid>
          {/* Netflix Logo 스타일 */}
          <Navbar.Brand
            href="#"
            className="fw-bold fs-3"
            style={{
              color: "#e50914",
              letterSpacing: "1px",
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            NETFLIX
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbarScroll"
            className="border-0 text-white"
          />
          <Navbar.Collapse id="navbarScroll">
            {/* 왼쪽 메뉴 */}
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                href="/"
                className="text-white-50 mx-2"
                style={{ fontWeight: "500" }}
              >
                홈
              </Nav.Link>

              <Nav.Link
                href="/movies"
                className="text-white-50 mx-2"
                style={{ fontWeight: "500" }}
              >
                영화
              </Nav.Link>
            </Nav>

            {/* 오른쪽 검색창 */}
            <Form className="d-flex align-items-center">
              <Form.Control
                type="search"
                placeholder="검색"
                className="me-2 bg-dark text-light border-0"
                aria-label="Search"
                style={{
                  width: "180px",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
              <Button
                variant="danger"
                style={{
                  backgroundColor: "#e50914",
                  border: "none",
                  fontWeight: "600",
                }}
              >
                검색
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
};

export default AppLayout;
