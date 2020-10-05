import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { UserContext } from "../../App";
import logo from "../../images/logos/logo.png";
import "./header.css";

// firebase
// firebase user login info
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../firebaseConfig";
import { Link } from "react-router-dom";
//firebase.initializeApp(firebaseConfig);

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function (result) {
        // Sign-out successful.
        console.log("success", result);

        sessionStorage.removeItem("Token");
        sessionStorage.removeItem("user");
        setLoggedInUser({ isAuthenticated: false });
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div className="header">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#deets" className="m-1">
                Home
              </Nav.Link>
              <Nav.Link href="#memes" className="m-1">
                Donation
              </Nav.Link>
              <Nav.Link href="#memes" className="m-1">
                Events
              </Nav.Link>
              <Nav.Link href="#memes" className="m-1">
                Blog
              </Nav.Link>
              {!loggedInUser.isAuthenticated && (
                <>
                  <Nav.Link href="/login" className="mx-1">
                    <Button varient="primary" className="btn btn-primary">
                      Register
                    </Button>
                  </Nav.Link>
                  <Nav.Link href="/admin-dashboard" className="mx-1">
                    <Button varient="secondary" className="btn btn-secondary">
                      Admin
                    </Button>
                  </Nav.Link>
                </>
              )}

              {loggedInUser.isAuthenticated && (
                <Dropdown className="m-1">
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    {loggedInUser.name + " "}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link to="/dashboard" className="dropdown-item">
                      Dashboard
                    </Link>

                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
