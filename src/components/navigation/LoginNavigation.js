import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "rsuite";

export default function LoginNavigation() {
  const location = useLocation();
  const LINKS = [
    { to: "/sign-in", text: "Sign In" },
    { to: "/sign-up", text: "Sign Up" },
  ];

  return (
    <>
      <Navbar className="d-flex justify-content-center">
        <div className="decorative-div-blue w-100 blue-background br-upturn"></div>
        <Nav className="d-flex justify-content-center">
          {LINKS.map((item) => (
            <Nav.Item key={item.to}>
              <Link
                to={item.to}
                className={item.to === location.pathname ? "active" : ""}
              >
                {item.text}
              </Link>
            </Nav.Item>
          ))}
        </Nav>
      </Navbar>
    </>
  );
}
