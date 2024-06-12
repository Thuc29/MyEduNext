import { Layout } from "antd";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Assignments from "../assignment/Assignment";
import "../content/home.css";
import Support from "../support/Support";
import Faq from "../faq/Faq";

const { Header, Content: AntContent } = Layout;

const semesters = [
  { id: 1, semester: "SUMMER2024" },
  { id: 2, semester: "SPRING2024" },
  { id: 3, semester: "SPRING2023" },
  { id: 4, semester: "FALL2023" },
  { id: 5, semester: "SUMMER2023" },
];

const courses = [
  {
    id: 1,
    title: "(SWT301 ↔ [SUMMER2024]) Software Testing_Kiểm thử phần mềm",
    code: "SE1837-NJ",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 28,
    link: "#",
    semester: "SUMMER2024",
  },
  {
    id: 2,
    title:
      "(SWP391 ↔ [SUMMER2024]) Software development project _ Dự án phát triển phần mềm",
    code: "SE1813-NET",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 30,
    link: "#",
    semester: "SUMMER2024",
  },
  {
    id: 3,
    title:
      "(FER202 ↔ [SUMMER2024]) Front-End web development with React _ Phát triển Web Front-End với React",
    code: "SE1837-NJ",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 30,
    link: "#",
    semester: "SUMMER2024",
  },
  {
    id: 4,
    title: "(SWR302 ↔ [SUMMER2024]) Software Requirement_Yêu cầu phần mềm",
    code: "SE1837-NJ",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 28,
    link: "#",
    semester: "SUMMER2024",
  },
  {
    id: 5,
    title: "(IOT102 ↔ [SPRING2024]) Internet of Things_Internet vạn vật",
    code: "SE1820",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 28,
    link: "#",
    semester: "SPRING2024",
  },
  {
    id: 6,
    title:
      "(SWE201c ↔ [SPRING2024]) Introduction to Software Engineering _ Nhập môn kỹ thuật phần mềm ",
    code: "SE1820",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 49,
    link: "#",
    semester: "SPRING2024",
  },
  {
    id: 7,
    title:
      "(JPD123 ↔ [SPRING2024]) Elementary Japanese 1-A1.2 _ Tiếng Nhật sơ cấp 1-A1.2",
    code: "SE1820",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 31,
    link: "#",
    semester: "SPRING2024",
  },
  {
    id: 8,
    title:
      "(PRJ301 ↔ [SPRING2024]) Java Web Application Development _ Phát triển ứng dụng Java web",
    code: "SE1820",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 30,
    link: "#",
    semester: "SPRING2024",
  },
  {
    id: 9,
    title:
      "(JPD113 ↔[FALL2023]) Elementary Japanese 1- A1.1_Tiếng Nhật sơ cấp 1-A1.1",
    code: "SE1820",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 30,
    link: "#",
    semester: "FALL2023",
  },
  {
    id: 10,
    title: "(DBI202 ↔ [FALL2023]) Database Systems _ Các cơ sở dữ liệu.",
    code: "SE1820",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 30,
    link: "#",
    semester: "FALL2023",
  },
  {
    id: 11,
    title:
      "(CSD201 ↔ [FALL2023]) Data Structures and Algorithm_Cấu trúc dữ liệu và giải ",
    code: "SE1820",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 30,
    link: "#",
    semester: "FALL2023",
  },
  {
    id: 12,
    title: "(NWC203c ↔ [SUMMER2023]) Computer Networking _ Mạng máy tính ",
    code: "SE1820",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 30,
    link: "#",
    semester: "SUMMER2023",
  },
  {
    id: 13,
    title:
      "(SSG104 ↔ [SUMMER2023]) Communication and In-Group Working Skills _ Kỹ năng giao tiếp và cộng tác  ",
    code: "SE1820",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 30,
    link: "#",
    semester: "SUMMER2023",
  },
  {
    id: 14,
    title: "(OSG202 ↔ [SUMMER2023]) Operating System _ Hệ điều hành ",
    code: "SE1820",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 30,
    link: "#",
    semester: "SUMMER2023",
  },
  {
    id: 15,
    title:
      "(PRO192 ↔ [SUMMER2023]) Object-Oriented Programming _ Lập trình hướng đối tượng ",
    code: "SE1820",
    platform: "edu_next_ltr_fpt_edu_02",
    students: 30,
    link: "#",
    semester: "SUMMER2023",
  },
];

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
  const [selectedSemester, setSelectedSemester] = useState(
    semesters[0].semester
  );
  const [view, setView] = useState("COURSE");

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };
  const filteredCourses = courses.filter(
    (course) => course.semester === selectedSemester
  );

  return (
    <AntContent>
      {selectedMenu === "home" && (
        <Container>
          <div className="d-flex m-2">
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
              <div className="semester-selector">
                <label htmlFor="semester"></label>
                <select
                  id="semester"
                  value={selectedSemester}
                  onChange={handleSemesterChange}
                  style={{
                    borderRadius: "5px",
                    width: "11%",
                    height: "30px",
                  }}
                >
                  {semesters.map((sem) => (
                    <option key={sem.id} value={sem.semester}>
                      {sem.semester}
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
                    paddingTop: "3%",
                    marginLeft: "-4%",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  Recently Updated (Để xem chi tiết về các thay đổi cập nhật gần
                  đây, vui lòng nhấp vào đây)
                </h5>
              </Header>

              <div className="course-container">
                <div className="course">
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="course-card">
                      <div className="course-title">{course.title}</div>
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
                            viewBox="0 0 576 512"
                          >
                            <path d="M528 160V416c0 8.8-7.2 16-16 16H320c0-44.2-35.8-80-80-80H176c-44.2 0-80 35.8-80 80H64c-8.8 0-16-7.2-16-16V160H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM272 256a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm104-48c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376z" />
                          </svg>
                          Number of students: {course.students}
                        </p>
                      </div>
                      <a href={course.link} className="course-link">
                        Go to course →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <img
                src="./assets/no_data_found.png"
                style={{ width: "30%", textAlign: "center" }}
              />
              <h5 style={{ color: "red" }}>No data available.</h5>
              <h5>
                Please contact your school administration for more information.
              </h5>
            </div>
          )}
        </Container>
      )}
      {selectedMenu === "assignments" && <Assignments />}
      {selectedMenu === "us" && <div>Upcoming Slots Content</div>}
      {selectedMenu === "rug" && <div>Read User Guide Content</div>}
      {selectedMenu === "support" && (
        <Support
          show={isSupportModalVisible}
          handleClose={handleSupportCancel}
        />
      )}
      {selectedMenu === "faq" && (
        <Faq
          show={isFaqModalVisible}
          handleFhandleCloseaqCancel={handleFaqCancel}
        />
      )}
    </AntContent>
  );
};

export default Home;
