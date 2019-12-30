import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export const MainNav = props => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#home">Property Development</a>
        </Navbar.Brand>
      </Navbar.Header>

      <Nav pullRight>
        {this.props.userId ? (
          <Nav.Item eventKey={5} href="#">
            {this.props.userId}
          </Nav.Item>
        ) : null}
        {this.props.userId ? null : (
          <Nav.Item eventKey={1} href="#" onClick={this.props.onLoginClicked}>
            Login
          </Nav.Item>
        )}
        {this.props.userId ? null : (
          <Nav.Item eventKey={2} href="#" onClick={this.props.onSignupClicked}>
            Sign Up
          </Nav.Item>
        )}
        {this.props.userId ? (
          <Nav.Item eventKey={4} href="#" onClick={this.props.onLogoutClicked}>
            Log Out
          </Nav.Item>
        ) : null}
      </Nav>
    </Navbar>
  );
};
