import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "./context/auth";
import Button from "react-bootstrap/Button";
import LightTheme from "./svg/LightTheme";
import DarkTheme from "./svg/DarkTheme";

const MyNavbar = () => {
  const [dark, setDark] = useState("flex");
  const [light, setLight] = useState("none");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { theme, setTheme } = useContext(AuthContext);
  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate("/login");
  };

  const changeThemeDark = () => {
    const body = document.querySelector("body");
    body.style.setProperty(`background-color`, `black`, `important`);
    setTheme((theme) => ({ ...theme, text: "white", navbar:"navbar-dark" }));
    setDark("none");
    setLight("flex");
  };

  const changeThemeLight = () => {
    const body = document.querySelector("body");
    body.style.setProperty(`background-color`, `darkgrey`, `important`);
    setTheme((theme) => ({ ...theme, text: "black", navbar:"navbar-light" }));
    setDark("flex");
    setLight("none");
  };

  return (
    <Navbar className={theme.navbar} expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link className="nav-link" to="/" style={{ color: `${theme.text}` }}>
            Watchat
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          className="mynav justify-content-end"
          id="navbarScroll"
        >
          {user ? (
            <Nav
              className="me-2 my-2 my-lg-0 "
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Item>
                <Link
                  style={{ color: `${theme.text}` }}
                  className="nav-link"
                  to="/"
                >
                  Messenger
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  style={{ color: `${theme.text}` }}
                  className="nav-link"
                  to="/profile"
                >
                  Profile
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  style={{ color: `${theme.text}` }}
                  onClick={handleSignOut}
                  className="nav-link"
                  to="/"
                >
                  Logout
                </Link>
              </Nav.Item>
              <Nav.Item style={{ display: `${dark}` }}>
                <Button
                  style={{
                    backgroundColor: `${theme.background}`,
                    border: `${theme.border}`,
                  }}
                  onClick={() => changeThemeDark()}
                >
                  <DarkTheme></DarkTheme>
                </Button>
              </Nav.Item>
              <Nav.Item style={{ display: `${light}` }}>
                <Button
                  style={{
                    backgroundColor: `${theme.background}`,
                    border: `${theme.border}`,
                  }}
                  onClick={() => changeThemeLight()}
                >
                  <LightTheme />
                </Button>
              </Nav.Item>
            </Nav>
          ) : (
            <Nav
              className="me-2 my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Item>
                <Link
                  style={{ color: `${theme.text}` }}
                  className="nav-link"
                  to="/register"
                >
                  Register
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  style={{ color: `${theme.text}` }}
                  className="nav-link"
                  to="/LogIn"
                >
                  Login
                </Link>
              </Nav.Item>
              <Nav.Item style={{ display: `${dark}` }}>
                <Button
                  style={{
                    backgroundColor: `${theme.background}`,
                    border: `${theme.border}`,
                  }}
                  onClick={() => changeThemeDark()}
                >
                  <DarkTheme></DarkTheme>
                </Button>
              </Nav.Item>
              <Nav.Item style={{ display: `${light}` }}>
                <Button
                  style={{
                    backgroundColor: `${theme.background}`,
                    border: `${theme.border}`,
                  }}
                  onClick={() => changeThemeLight()}
                >
                  <LightTheme />
                </Button>
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
