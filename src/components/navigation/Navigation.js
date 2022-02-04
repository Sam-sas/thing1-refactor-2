import React from "react";
import { IconContext } from "react-icons/lib";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Nav, Navbar } from "rsuite";
import { useAuth } from "../../utilities/contexts/authContext";
import { NavigationData } from "./NavigationData";

export default function Navigation() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const LINKS = [
    { to: "/", text: "return" },
    { to: "/sign-in", text: "Sign In" },
    { to: "/sign-up", text: "Sign Up" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/sign-in");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
    <IconContext.Provider value={{ color: "#fff" }}>
    <Navbar className="blue-background">
        <Nav vertical className="d-flex flex-column h-100">
          <Nav.Item as={Link} to="/account">Account</Nav.Item>
          {NavigationData.map((item, index) => (
            <Nav.Item key={index} as={Link}  to={item.path}
            className={item.path === location.pathname ? "active" : ""}>
                {item.icon} {item.title}
            </Nav.Item>
          ))}
          <Nav.Item>
            <Button onClick={handleLogout} block className="orange-background br-downturn text-white">
              Log out
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar>
    </IconContext.Provider>
     
    </>
  );
}
