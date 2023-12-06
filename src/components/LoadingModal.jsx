import React , { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function LoadingModal(props) {
//   const [show, setShow] = useState(false);
  const {setShow, show} = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    

      <Modal  show={show} onHide={handleClose}  animation={false}>

      {/* <Spinner animation="grow" /> */}
      <Modal.Body style={{display:'flex', justifyContent:'center'}} >
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      </Modal.Body>
       
      </Modal>
    
  );
}

export default LoadingModal;