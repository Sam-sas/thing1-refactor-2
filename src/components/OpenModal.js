import React, { useState } from 'react';
import { Button, ButtonToolbar, Modal, Radio, RadioGroup } from 'rsuite';

export default function OpenModal({ children, buttonText, modalTitle }) {
    const [open, setOpen] = useState(false);
    const [backdrop, setBackdrop] = useState('static');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div className="modal-container">
    <ButtonToolbar>
      <Button onClick={handleOpen}>{buttonText}</Button>
    </ButtonToolbar>

    <Modal backdrop={backdrop} keyboard={false} open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
          {children}
          <Button block onClick={handleClose} appearance="primary" className="blue-background br-rounded">
          Close Modal
        </Button>
      </Modal.Body>
    </Modal>
  </div>
    );
}
