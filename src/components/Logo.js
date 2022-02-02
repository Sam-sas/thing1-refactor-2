import React from "react";
import { Container } from "rsuite";
import logo from "../images/thing1-logo-hi-res.png";

export default function Logo() {
  return (
    <Container className="logo-container">
      <div className="logo d-flex justify-content-center">
        <img
          className="width-50"
          src={logo}
          alt="Thing1 logo"
        />
      </div>
    </Container>
  );
}
