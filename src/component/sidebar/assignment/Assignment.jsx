import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./assignment.css";
import { SwapLeftOutlined, SwapRightOutlined } from "@ant-design/icons";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const assignmentsPerPage = 8;

  useEffect(() => {
    fetch("http://localhost:9999/assignment")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAssignments(data);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  }, []);

  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = assignments.slice(
    indexOfFirstAssignment,
    indexOfLastAssignment
  );

  const totalPages = Math.ceil(assignments.length / assignmentsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <Button
        key={number}
        onClick={() => handlePageClick(number)}
        className={number === currentPage ? "active" : ""}
      >
        {number}
      </Button>
    ));
  };

  return (
    <Container>
      <Row>
        {currentAssignments.map((assignment) => (
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
                  <strong>Subject:</strong>
                  <a
                    href={assignment.link}
                    style={{ color: "#6ebd6f", fontStyle: "normal" }}
                  >
                    {assignment.subject}
                  </a>
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
      <div className="pagination">
        <Button onClick={prevPage} disabled={currentPage === 1} className="mr-2 ">
          <SwapLeftOutlined />
        </Button>
        {renderPageNumbers()}
        <Button onClick={nextPage} disabled={currentPage === totalPages} className="">
          <SwapRightOutlined />
        </Button>
      </div>
    </Container>
  );
};

export default Assignments;
