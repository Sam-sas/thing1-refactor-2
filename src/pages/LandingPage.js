import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "rsuite";
import logo from "../images/thing1-logo-hi-res.png";

export default function LandingPage() {
  return (
    <>
      <div className="d-flex justify-content-center flex-column landing-page">
        <div className="logo-container d-flex justify-content-center align-items-center flex-column w-100">
          <div className="logo d-flex justify-content-center align-items-center w-100">
            <img
              className="width-250 height-250"
              src={logo}
              alt="Thing1 logo"
            />
          </div>
          <p className="slogan kalam text-center">Find Your Niche</p>
        </div>
        <ButtonGroup id="landing-button-container" className=" blue-background br-downturn mt-3">
          <Link to="/sign-in">
            <Button block appearance="primary" className="blue-background br-downturn lp-button">
              Login
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button block appearance="primary" className="orange-background br-downturn lp-button">
              Sign Up
            </Button>
          </Link>
        </ButtonGroup>
      </div>
    </>
  );
}
