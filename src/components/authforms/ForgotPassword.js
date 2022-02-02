import React, { useState } from 'react';
import { Button, ButtonToolbar, Form, Message } from 'rsuite';
import { useAuth } from '../../utilities/contexts/authContext';
import FormLayout from '../layouts/FormLayout';
import Logo from '../Logo';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState('');
  const { passwordReset } = useAuth();

  const handleNewPassword = async (e) => {
    e.preventDefault();
    try {
        setMessage('');
        setError('');
        setLoading(true);
        await passwordReset(email);
        setMessage('Check your inbox for further instructions');
    } catch {
        /*firebase auto sets password requirements to 6+ characters, otherwise returns an error */
        setError('Failed to reset password');
    }
    setLoading(false);
  }

  return (
    <FormLayout>
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='success'>{message}</Message>}
      <div className="mt-3">
        <Form onSubmit={handleNewPassword}>
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
    );
}
