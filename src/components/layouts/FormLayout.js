import React from "react";
import {
  Col,
  Grid,
  Panel,
  Container,
  Row,
} from "rsuite";
import LoginNavigation from "../navigation/LoginNavigation";

export default function FormLayout({ children }) {
  return (
    <Container>
      {/* //24 colum system instead of 12 like bootstrap */}
      <Grid>
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
              <Panel>
                  <LoginNavigation />
              </Panel>
            <Panel className="align-items-center d-flex flex-column form-panel validation-form-container">
                {children}
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
}
