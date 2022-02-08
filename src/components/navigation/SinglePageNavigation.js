import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "rsuite";

export default function SinglePageNavigation({ links }) {
  const location = useLocation();
  
  return (
    <>
      <Navbar className="d-flex justify-content-center">
        <div className="decorative-div-blue w-100 blue-background br-upturn"></div>
        <Nav className="d-flex justify-content-center mt-3">
          {links.map((item) => (
            <Nav.Item key={item.to} as={Link} to={item.to}
            className={item.to === location.pathname ? "active" : ""}>
                {item.text}
            </Nav.Item>
          ))}
        </Nav>
      </Navbar>
    </>
  );
}
