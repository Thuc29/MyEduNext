import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../assignment/assignment.css";

const assignments = [
  {
    id: 1,
    title: "Submit Lab1",
    slot: 4,
    subject: "OSG202 ↔ [SUMMER2023]",
    class: "SE1820",
    dueDate: "00:00 18/05/2023 (GMT+7)",
    link: "#",
  },
  {
    id: 2,
    title: "Exercises submit",
    slot: 20,
    subject: "OSG202 ↔ [SUMMER2023]",
    class: "SE1820",
    dueDate: "12:20 13/07/2023 (GMT+7)",
    link: "#",
  },
  {
    id: 3,
    title: "Exercise",
    slot: 12,
    subject: "DBI202 ↔ [FALL2023]",
    class: "SE1820",
    dueDate: "17:40 12/10/2023 (GMT+7)",
    link: "#",
  },
  {
    id: 4,
    title: "Practice",
    slot: 13,
    subject: "DBI202 ↔ [FALL2023]",
    class: "SE1820",
    dueDate: "15:10 17/10/2023 (GMT+7)",
    link: "#",
  },
  {
    id: 5,
    title: "Assignment",
    slot: 13,
    subject: "DBI202 ↔ [FALL2023]",
    class: "SE1820",
    dueDate: "23:59 06/11/2023 (GMT+7)",
    link: "#",
  },
  {
    id: 6,
    title: "Exercise Trigger",
    slot: 14,
    subject: "DBI202 ↔ [FALL2023]",
    class: "SE1820",
    dueDate: "17:40 19/10/2023 (GMT+7)",
    link: "#",
  },
  {
    id: 7,
    title: "SM1_Discussion Result Submit",
    slot: 3,
    subject: "SWT301 ↔ [SUMMER2024]",
    class: "SE1837-NJ",
    dueDate: "07:00 13/05/2024 (GMT+7)",
    link: "#",
  },
  {
    id: 8,
    title: "SM2_Discussion Result Submit",
    slot: 4,
    subject: "SWT301 ↔ [SUMMER2024]",
    class: "SE1837-NJ",
    dueDate: "00:00 14/05/2024 (GMT+7)",
    link: "#",
  },
  {
    id: 9,
    title: "SM3_Discussion Result Submit",
    slot: 5,
    subject: "SWT301 ↔ [SUMMER2024]",
    class: "SE1837-NJ",
    dueDate: "07:00 16/05/2024 (GMT+7)",
    link: "#",
  },
  {
    id: 10,
    title: "SM5_Discussion Result Submit",
    slot: 6,
    subject: "SWT301 ↔ [SUMMER2024]",
    class: "SE1837-NJ",
    dueDate: "07:00 20/05/2024 (GMT+7)",
    link: "#",
  },
  {
    id: 11,
    title: "SM5_Discussion Result Submit",
    slot: 7,
    subject: "SWT301 ↔ [SUMMER2024]",
    class: "SE1837-NJ",
    dueDate: "07:00 23/05/2024 (GMT+7)",
    link: "#",
  },
  {
    id: 12,
    title: "SM6_Discussion Result Submit",
    slot: 8,
    subject: "SWT301 ↔ [SUMMER2024]",
    class: "SE1837-NJ",
    dueDate: "13:00 27/05/2024 (GMT+7)",
    link: "#",
  },
  {
    id: 13,
    title: "SM7_Discussion Result Submit",
    slot: 8,
    subject: "SWT301 ↔ [SUMMER2024]",
    class: "SE1837-NJ",
    dueDate: "07:00 30/05/2024 (GMT+7)",
    link: "#",
  },
  {
    id: 14,
    title: "SM8_Discussion Result Submit",
    slot: 8,
    subject: "SWT301 ↔ [SUMMER2024]",
    class: "SE1837-NJ",
    dueDate: "07:00 03/06/2024 (GMT+7)",
    link: "#",
  },
];

const Assignments = () => {
  return (
    <Container>
      <Row>
        {assignments.map((assignment) => (
          <Col key={assignment.id} md={3} className="mb-3">
            <Card className="assignment-card">
              <Card.Body>
                <Card.Title className="assignment-title">
                  {assignment.title}
                </Card.Title>
                <Card.Text>
                  <strong>Slot:</strong> {assignment.slot} <br />
                  <svg
                    style={{ width: "13px", margin: "0px 10px 0px 0px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                  </svg>
                  <strong>Subject:</strong>{" "}
                  <a href="" style={{ color: "#6ebd6f", fontStyle: "normal" }}>
                    {assignment.subject}{" "}
                  </a>{" "}
                  <br />
                  <svg
                    style={{
                      width: "15px",
                      margin: "0px 10px 0px 0px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M208 352c-2.4 0-4.8 .4-7.1 1.1C188 357.3 174.4 360 160 360c-14.4 0-28-2.7-41-6.9-2.3-.7-4.7-1.1-7.1-1.1C49.9 352-.3 402.5 0 464.6 .1 490.9 21.7 512 48 512h224c26.3 0 47.9-21.1 48-47.4 .3-62.1-49.9-112.6-112-112.6zm-48-32c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zM592 0H208c-26.5 0-48 22.3-48 49.6V96c23.4 0 45.1 6.8 64 17.8V64h352v288h-64v-64H384v64h-76.2c19.1 16.7 33.1 38.7 39.7 64H592c26.5 0 48-22.3 48-49.6V49.6C640 22.3 618.5 0 592 0z" />
                  </svg>
                  <strong>Class:</strong> {assignment.class} <br />
                  <svg
                    style={{
                      width: "15px",
                      margin: "0px 10px 0px 0px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                  </svg>
                  <strong>Due date:</strong> {assignment.dueDate}
                </Card.Text>
                <Button href={assignment.link}>View assignment →</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Assignments;
