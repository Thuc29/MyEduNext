import { Layout } from "antd";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import CourseControls from "../course/FormSlot";

const { Header, Content: AntContent } = Layout;

const Home = ({
  selectedMenu,
  // support
  isSupportModalVisible,
  handleSupportOk,
  handleSupportCancel,
  // faq
  isFaqModalVisible,
  handleFaqOk,
  handleFaqCancel,
}) => {
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedSemesterId, setSelectedSemesterId] = useState(null);
  const [view, setView] = useState("COURSE");

  useEffect(() => {
    fetch("http://localhost:9999/semester")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSemesters(data);
        if (data.length > 0) {
          setSelectedSemesterId(data[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching semesters:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedSemesterId) {
      fetch(`http://localhost:9999/course?semesterId=${selectedSemesterId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setCourses(data))
        .catch((error) => {
          console.error("Error fetching courses:", error);
        });
    }
  }, [selectedSemesterId]);

  const handleSemesterChange = (e) => {
    setSelectedSemesterId(e.target.value);
  };

  return (
    <AntContent >
      {selectedMenu === "home" && (
        <Container >
          <div className=" d-flex m-2">
            <h5
              style={{
                paddingRight: "3%",
                cursor: "pointer",
                color: view === "COURSE" ? "blue" : "black",
                position: "relative",
              }}
              onClick={() => setView("COURSE")}
            >
              COURSE
            </h5>
            <h5
              style={{
                cursor: "pointer",
                color: view === "PROJECT" ? "blue" : "black",
                position: "relative",
              }}
              onClick={() => setView("PROJECT")}
            >
              PROJECT
            </h5>
          </div>
          <div>
            {view === "COURSE" && (
              <div className="semester-selector d-grid">
                <label htmlFor="semester"></label>
                Semester
                <select
                  id="semester"
                  value={selectedSemesterId}
                  onChange={handleSemesterChange}
                  style={{
                    borderRadius: "5px",
                    width: "11%",
                    height: "30px",
                  }}
                >
                  {semesters.map((sem) => (
                    <option key={sem.id} value={sem.id}>
                      {sem.semester_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {view === "COURSE" ? (
            <div>
              <Header style={{ backgroundColor: "#04040400" }}>
                <h5
                  style={{
                    marginLeft: "-4%",
                    color: "blue",
                    cursor: "pointer",
                    fontSize: "initial"
                  }}
                >
                  Recently Updated (Để xem chi tiết về các thay đổi cập nhật gần
                  đây, vui lòng nhấp vào đây)
                </h5>
              </Header>

              <div className="course-container">
                <div className="course">
                  {courses.map((course) => (
                    <div key={course.id} className="course-card">
                      <div className="course-title">
                        <Link to={`/course/${course.id}`}>{course.title}</Link>
                      </div>
                      <div className="course-info">
                        <p>
                          <svg
                            style={{
                              width: "20px",
                              margin: " 0px 15px 0px 0px",
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                          >
                            <path d="M208 352c-2.4 0-4.8 .4-7.1 1.1C188 357.3 174.4 360 160 360c-14.4 0-28-2.7-41-6.9-2.3-.7-4.7-1.1-7.1-1.1C49.9 352-.3 402.5 0 464.6 .1 490.9 21.7 512 48 512h224c26.3 0 47.9-21.1 48-47.4 .3-62.1-49.9-112.6-112-112.6zm-48-32c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zM592 0H208c-26.5 0-48 22.3-48 49.6V96c23.4 0 45.1 6.8 64 17.8V64h352v288h-64v-64H384v64h-76.2c19.1 16.7 33.1 38.7 39.7 64H592c26.5 0 48-22.3 48-49.6V49.6C640 22.3 618.5 0 592 0z" />
                          </svg>
                          {course.code}
                        </p>
                        <p>
                          <svg
                            style={{
                              width: "20px",
                              margin: "0px 15px 0px 0px",
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
                          </svg>
                          {course.platform}
                        </p>
                        <p>
                          <svg
                            style={{
                              width: "20px",
                              margin: "0px 15px 0px 0px",
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                          >
                            <path d="M144 32c-8.8 0-16 7.2-16 16V112H96V48c0-26.5 21.5-48 48-48H496c26.5 0 48 21.5 48 48V112H512V48c0-8.8-7.2-16-16-16H144zM224 512c-26.5 0-48-21.5-48-48V240c0-26.5 21.5-48 48-48H416c26.5 0 48 21.5 48 48V464c0 26.5-21.5 48-48 48H224zm0-32H416c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H224c-8.8 0-16 7.2-16 16V464c0 8.8 7.2 16 16 16zm40-256H352c8.8 0 16 7.2 16 16v160c0 8.8-7.2 16-16 16H264c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16z" />
                          </svg>
                          Number of students: {course.students}
                        </p>
                        <p className="pt-3">
                          <Link to={`/course/${course.id}`}>
                            Go to course <ArrowRightOutlined /></Link>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
            : (
              <div className="empty-component">
                <img src="/assets/box-no-data-KZXFWQlG.png" alt="" />
                <div className="no-data-text">
                  <h5 className="fs-18 accent-color mg-b-10 text-primary">No data available.</h5>
                  <p className="mg-0 fs-12 mt-2" style={{ fontSize: "x-large" }}>Please contact your school administration for more information.</p>
                </div>
              </div>
            )
          }
        </Container>
      )}
    </AntContent>
  );
};

export default Home;
