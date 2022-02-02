import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, toaster, Message, Form, ButtonToolbar } from "rsuite";
import { db, auth } from "../../utilities/Firebase";
import firebase from "firebase/compat/app";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../../utilities/contexts/authContext";
import FormLayout from "../layouts/FormLayout";
import Logo from "../Logo";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const { currentUser } = useAuth();
  const history = useHistory();
  const googleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  const emailSignUp = async () => {
    console.log(name, email, password, confirmPassword);
    // console.log(passwordConfirmRef.current.value);
    if (
      password !== "" &&
      confirmPassword !== " " &&
      password !== confirmPassword
    ) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      toaster.push(
        <Message type="info" closable>
          Signed In + {name}
        </Message>
      );
      await addToProfileDoc(currentUser, name);
      history.push("/dashboard");
    } catch (err) {
      /*firebase auto sets password requirements to 6+ characters, otherwise returns an error */
      setError(err.message);
      toaster.push(
        <Message type="error" closable>
          Unable to log in + {error}
        </Message>
      );
    }
    setLoading(false);
  };

  const addToProfileDoc = async (user, name) => {
    const profilesRef = collection(db, "profiles");

    await addDoc(profilesRef, {
      name: name,
      loginUid: user.uid,
      email: user.email,
    });
  };
  const signInWithProvider = async (provider) => {
    try {
      setError("");
      setLoading(true);
      //import provider from firebase library
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      //anything with db you need to use promises
      if (additionalUserInfo.isNewUser) {
        addToProfileDoc(user, user.displayName);
      }
      toaster.push(
        <Message type="info" closable>
          Signed In + {user.displayName}
        </Message>
      );
      history.push("/dashboard");
    } catch (err) {
      setError(err);
      toaster.push(
        <Message type="error" closable>
          Unable to log in + {err.Message}
        </Message>
      );
    }
    setLoading(false);
  };

  return (
    <FormLayout>
      <div className="mt-3">
        <Form onSubmit={emailSignUp}>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <Form.Group controlId="name">
              <Form.Control
                required
                name="name"
                type="name"
                autoComplete="off"
                onChange={(e) => setName(e)}
                placeholder="Display Name"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Control
                required
                name="email"
                type="email"
                onChange={(e) => setEmail(e)}
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control
                required
                name="password"
                type="password"
                autoComplete="off"
                onChange={(e) => setPassword(e)}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Control
                required
                name="confirmPassword"
                type="password"
                autoComplete="off"
                onChange={(e) => setConfirmPassword(e)}
                placeholder="Confirm Password"
              />
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
        <Button
          block
          appearance="primary"
          onClick={googleSignIn}
          disabled={loading}
          className="mt-3 blue-background br-rounded"
        >
          Continue with Google
        </Button>
      </div>
    </FormLayout>
  );
}
