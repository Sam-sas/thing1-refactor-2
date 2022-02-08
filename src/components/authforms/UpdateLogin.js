import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { Button, ButtonToolbar, Form, Message, toaster } from "rsuite";
import { useAuth } from "../../utilities/contexts/authContext";
import { db } from "../../utilities/Firebase";
import { UPDATEUSERLINKS } from "../../utilities/utilities";
import FormLayout from "../layouts/FormLayout";
import NavigationLayout from "../layouts/NavigationLayout";
import Logo from "../Logo";
import SinglePageNavigation from "../navigation/SinglePageNavigation";
export default function UpdateLogin() {
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [newEmail, setNewEmail] = useState(currentUser.email);
  const [newPassword, setNewPassword] = useState(currentUser.password);
  const [newConfirmPassword, setNewConfirmPassword] = useState(
    currentUser.password
  );
  const [userDoc, setUserDoc] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateLogin = async () => {
    if (newPassword !== newConfirmPassword) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (newEmail && newEmail !== currentUser.email) {
      promises.push(updateEmail(newEmail));
      try {
        //update profile -- use in utility/custom hooks
        const profilesRef = collection(db, "profiles");
        const profileQuery = query(
          profilesRef,
          where("loginUid", "==", currentUser.uid)
        );
        const profileQuerySnapshot = await getDocs(profileQuery);
        profileQuerySnapshot.forEach((profileFound) => {
          const userDocRef = doc(db, "profiles", profileFound.id);
          updateDoc(userDocRef, {
            email: newEmail,
          });
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.message);
        setLoading(false);
      }
      console.log(userDoc);
    }

    if (
      newPassword &&
      newConfirmPassword &&
      newPassword !== currentUser.password
    ) {
      promises.push(updatePassword(newPassword));
    }

    Promise.all(promises)
      .then(() => {
        toaster.push(
          <Message type="info" closable>
            You've changed your login!
          </Message>
        );
      })
      .catch(() => {
        setError("Failed to update Account");
        toaster.push(
          <Message type="error" closable>
            {error}
          </Message>
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <NavigationLayout>
      <SinglePageNavigation links={UPDATEUSERLINKS} />
      <FormLayout>
        <Form onSubmit={handleUpdateLogin}>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <Form.Group controlId="email">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control
                name="email"
                type="email"
                onChange={(e) => setNewEmail(e)}
                placeholder={currentUser.email}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control
                name="password"
                type="password"
                autoComplete="off"
                onChange={(e) => setNewPassword(e)}
              />
              <Form.HelpText>Leave Blank to keep password</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.ControlLabel>Confirm Password</Form.ControlLabel>
              <Form.Control
                name="confirmPassword"
                type="password"
                autoComplete="off"
                onChange={(e) => setNewConfirmPassword(e)}
              />
              <Form.HelpText>Leave Blank to keep password</Form.HelpText>
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
      </FormLayout>
    </NavigationLayout>
  );
}
