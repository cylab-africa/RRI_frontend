import React , { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal(props) {
  const {setShow, show, finishEvaluation, nextEvaluation} = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    

      <Modal  show={show} onHide={handleClose}  animation={false}>
 <Modal.Header closeButton>
          <Modal.Title>Submitted successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you for completing the evaluation. If you'd like to view your score, press <b>FINISH</b> Alternatively, press <b>CONTINUE</b> to proceed with the next layer of evaluation.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={finishEvaluation}>
            FINISH
          </Button>
          <Button variant="primary" onClick={nextEvaluation}>
            CONTINUE
          </Button>
        </Modal.Footer>
      </Modal>
    
  );
}

export default ConfirmModal;