import React from 'react';
import { Button, Modal } from '@mui/material';

const MyModal = (props) => {
  const { isOpen, onClose, children } = props;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div>
        {children}
        <Button onClick={onClose}>Close Modal</Button>
      </div>
    </Modal>
  );
}

export default MyModal;