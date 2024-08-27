import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./faq.css";

function Faq({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{ height: "50%" }}>
        <Modal.Title>FQA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontSize: "1.20rem" }}>
          <b>
            If the login displays the message "AN ERROR HAS OCCURRED," please
            verify the system's time settings according to GMT+07:00.
          </b>
        </p>
        <p style={{ fontSize: "13px", fontStyle: "italic", color: "red" }}>
          Hãy chắc chắn rằng thời gian trên đồng hồ của hệ thống (LAPTOP hoặc
          PC) đồng nhất với thời gian hiện tại. (Hãy xem đồng hồ trên điện thoại
          của bạn để xác nhận lại với PC hoặc LAPTOP)
        </p>
        <ul>
          <li style={{ fontSize: "13px" }}>
            Checking and change time of laptop or pc to current times
          </li>
          <p style={{ fontSize: "13px" }}>
            <a href="#">How to setting </a>
          </p>
          <img src="./assets/faq1.png" style={{ height: "50px" }}></img>

          <li style={{ fontSize: "13px" }}>Setting times</li>
          <img src="./assets/faq2.png" style={{ height: "200px" }}></img>
        </ul>
        <p>
          <b>Why students can not find a classroom - </b>
          <b style={{ color: "red" }}> (Not exist account)</b>
        </p>
        <ul>
          <li style={{ fontSize: "13px" }}>
            Because students are added to the class late, students should ask
            the instructor to add students to the classroom
          </li>
          <li style={{ fontSize: "13px" }}>
            The lecturer must click{" "}
            <b style={{ color: "red" }}>UPDATE STUDENT LIST, TIMETABLE"</b> to
            sync students for a classroom
          </li>
          <img src="./assets/faq3.png" style={{ height: "150px" }}></img>
        </ul>

        <b>Why lecturer can not change the setting of a CQ? </b>
        <ul>
          <li style={{ fontSize: "13px" }}>
            Default "CQs" received from FAP which, lecturer cannot be changed
          </li>
          <li style={{ fontSize: "13px" }}>
            The lecturer only changes the settings for "CQs" created by the
            lecturer himself
          </li>
        </ul>

        <b>How to create group for slot?</b>
        <ul>
          {" "}
          <li style={{ fontSize: "13px" }}>
            Groups created for a "CQ" in the same "Slot" will be assigned to all
            "CQs" in the same "Slot" so lecturer only need to create groups once
            per "Slot".
          </li>
          <li style={{ fontSize: "13px" }}>
            To create a group of a "Slot" lecturer must click on the{" "}
            <n style={{ color: "red" }}>"View detail"</n> then selected "CQ" and
            click on the "CREATE GROUP" button.
          </li>
          <img src="./assets/faq4.png" style={{ height: "480px" }}></img>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Faq;
