import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navigation.css";
import UserContext from "../app/UserContext";


export default function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <Navbar className="navbar">
      <Container className="nav-container">
        <Navbar.Brand href="/"> Jobly </Navbar.Brand>

        {currentUser ? (
          <Nav>
            <NavLink className="nav-link" to="/companies"> Companies </NavLink>
            <NavLink className="nav-link" to="/jobs"> Jobs </NavLink>
            <NavLink className="nav-link" to="/profile"> Profile </NavLink>
            <Link className="nav-link" to="/" onClick={logout}> Logout {currentUser.firstName} </Link>
          </Nav>
        ) : (
          <Nav>
            <NavLink className="nav-link" to="/login"> Login </NavLink>
            <NavLink className="nav-link" to="/signup"> Signup </NavLink>
          </Nav>
        )}

      </Container>
    </Navbar>
  )
}
