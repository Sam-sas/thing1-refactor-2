import React from "react";
import { Col, Container, Grid, Row } from "rsuite";
import Sidebar from "../Sidebar";

export default function NavigationLayout({ children }) {
  return (
    <Container>
      <Grid fluid className="h-100">
        <Row className="h-100">
          <Col sx={24} md={8} className="h-100">
            <Sidebar />
            {children}
          </Col>
        </Row>
      </Grid>
    </Container>
  );
}
