import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonToolbar,
  Col,
  Container,
  Form,
  Loader,
  Message,
  Radio,
  RadioGroup,
  Row,
} from "rsuite";
import { db } from "../../utilities/Firebase";
import FormLayout from "../layouts/FormLayout";
import Logo from "../Logo";
import OpenModal from "../OpenModal";

export default function ExpertApproval({ expert }) {
  const [approvalStatus, setApprovalStatus] = useState(false);
  const [dbExpert, setdbExpert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const handleExpertApproval = async () => {
    try {
      const expertRef = doc(db, "experts", dbExpert);
      console.log(expertRef);
      if (approvalStatus) {
          console.log("approval")
        await updateDoc(expertRef, {
          approvalStatus: "approved",
          toBeReviewed: false,
        });
      }
      if (!approvalStatus) {
          console.log("no approval")
        await updateDoc(expertRef, {
          approvalStatus: "unapproved",
          toBeReviewed: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const subscription = { unsubscribe: () => undefined };
    const getExpert = async() => {
    setLoading(true);
    try {
      const expertCollectionRef = collection(db, "experts");
      const expertQuery = query(
        expertCollectionRef,
        where("loginUid", "==", expert.loginUid)
      );
      const expertQuerySnapshot = await getDocs(expertQuery);
      expertQuerySnapshot.forEach((profileFound) => {
        setdbExpert(profileFound.id);
        console.log(dbExpert);
      });
      updateExpertStatus(dbExpert);
      setMessage(true);
    } catch (err) {
      console.log(err);
      setMessage(false);
      setLoading(false);
    }
    setLoading(false);
    subscription.unsubscribe();
    };
    getExpert();
    return () => {
        subscription.unsubscribe();
      };
},[dbExpert, expert.loginUid]);
    

  const updateExpertStatus = async (expertId) => {
    
  };

  return (
    <OpenModal buttonText={expert.displayName} modalTitle="expertCheck">
    <FormLayout>
      {loading && <Loader size="md" center speed="slow" />}
      {message && approvalStatus && (
        <Message type="info">{expert.displayName} is now an expert!</Message>
      )}
      {message && !approvalStatus && (
        <Message type="info">{expert.displayName} is not an expert</Message>
      )}
      <div className="mt-3">
        <Container>
            <Row>
                <Col>
                    <h4>{expert.displayName}</h4>
                    <p>Expert Title: {expert.expertTitle}</p>
                    <p>Location: {expert.location}</p>
                    <p>Experience: {expert.experience}</p>
                </Col>
            </Row>
        </Container>
        <Form onSubmit={handleExpertApproval}>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <Form.Group controlId="approvalStatus">
              <RadioGroup
                name="radioList"
                inline
                appearance="picker"
                defaultValue={false}
                onChange={(e) => {
                  setApprovalStatus(e);
                }}
              >
                <Radio value={true}>Approve</Radio>
                <Radio value={false}>Disapprove</Radio>
              </RadioGroup>
            </Form.Group>
          </div>
          <Logo />
          <Form.Group>
            <ButtonToolbar className="d-flex flex-column">
              <Button
                block
                appearance="primary"
                disabled={loading}
                type="submit"
                className="blue-background br-rounded"
              >
                Submit
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </div>
    </FormLayout>
    </OpenModal>
    
  );
}
