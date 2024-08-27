import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./support.css";

function SupportModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Support</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: "red", fontWeight: "bold" }}>
          Please refer to 'FQA' before requesting support
        </p>
        <p style={{ color: "red" }}>
          Contact IT: 0123456789. If the request is important
        </p>
        <Form>
          <Form.Group controlId="formTitle">
            <input className="input" type="text" placeholder="Title *" />
          </Form.Group>
          <Form.Group controlId="formContactInfo">
            <input
              className="input"
              type="text"
              placeholder="Contact information (mobile or email) should be provided. You should provide a mobile phone number."
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder="" />
          </Form.Group>
          <Form.Text
            className="text-muted"
            style={{ fontWeight: "inherit", fontSize: "10px" }}
          >
            (*)For word documents: Paste single page per time
          </Form.Text>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SupportModal;
