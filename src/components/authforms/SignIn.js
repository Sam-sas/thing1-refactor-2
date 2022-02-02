import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, toaster, Message, Form, ButtonToolbar } from "rsuite";
import { auth } from "../../utilities/Firebase";
import firebase from "firebase/compat/app";
import { useAuth } from "../../utilities/contexts/authContext";
import FormLayout from "../layouts/FormLayout";
import Logo from "../Logo";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const history = useHistory();
  const googleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history.push("/dashboard");
    } catch {
      /*firebase auto sets password requirements to 6+ characters, otherwise returns an error */
      setError("Failed to sign in");
      toaster.push(
        <Message type="error" closable>
          {error}
        </Message>
      );
    }
    setLoading(false);
  }
  const signInWithProvider = async (provider) => {
    try {
      setError("");
      setLoading(true);
      //import provider from firebase library
      const { user } = await auth.signInWithPopup(provider);
      toaster.push(
        <Message type="info" closable>
          Signed In + {user.displayName}
        </Message>
      );
      history.push("/dashboard");
    } catch (err) {
      setError("Failed to sign in");
      setError(err);
      toaster.push(
        <Message type="error" closable>
          {error}
        </Message>
      );
    }
    setLoading(false);
  };

  return (
    <FormLayout>
      <div className="mt-3">
        <Form onSubmit={handleSignIn}>
          <div className="d-flex justify-content-center flex-column align-items-center">
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
        <Link to="/forgot-password">
        <Button
             block
             appearance="primary"
             disabled={loading}
             className="mt-3 blue-background br-rounded"
        >
            Forgot Password
        </Button>
        </Link>
      </div>
    </FormLayout>
  );
}
