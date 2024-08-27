import React, { useState, useEffect, useRef } from 'react';
import { Card, Form, Button, Col, Row, Container, InputGroup, FormControl } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import './formslot.css';
import { CalendarOutlined } from '@ant-design/icons';
import { Layout, theme, Collapse } from 'antd';
import Logo from '../sidebar/logo/Logo';
import MenuList from '../sidebar/menu/Menu';
import ToggleButton from '../sidebar/toggleButtun/ToggleButton';
import Assign from './assign/Assign';

const { Sider } = Layout;
const { Panel } = Collapse;

const ITEMS_PER_PAGE = 10;

const CourseControls = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState([]);
  const [courseInfo, setCourseInfo] = useState(null);
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapse, setCollapse] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("course");
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);
  const [isFaqModalVisible, setIsFaqModalVisible] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [currentSlot, setCurrentSlot] = useState(null);
  const slotRefs = useRef([]);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const handleAssignShow = () => setIsAssignModalVisible(true);
  const handleAssignClose = () => setIsAssignModalVisible(false);

  const handleMenuClick = (key) => {
    if (key === "support") {
      setIsSupportModalVisible(true);
    } else if (key === "faq") {
      setIsFaqModalVisible(true);
    }
    setSelectedMenu(key);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [slotResponseSWT, slotResponseSWP, slotResponseFER, slotResponseSWR, courseResponse] = await Promise.all([
          fetch('http://localhost:9999/slotSWT'),
          fetch('http://localhost:9999/slotSWP'),
          fetch('http://localhost:9999/slotFER'),
          fetch('http://localhost:9999/slotSWR'),
          fetch('http://localhost:9999/course')
        ]);
        if (!slotResponseSWT.ok || !slotResponseSWP.ok || !slotResponseFER.ok || !slotResponseSWR.ok || !courseResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        const slotDataSWT = await slotResponseSWT.json();
        const slotDataSWP = await slotResponseSWP.json();
        const slotDataFER = await slotResponseFER.json();
        const slotDataSWR = await slotResponseSWR.json();
        const courseData = await courseResponse.json();
        const allSlotData = [...slotDataSWT, ...slotDataSWP, ...slotDataFER, ...slotDataSWR];
        const filteredSlotData = allSlotData.filter(item => item.courseId === parseInt(courseId));
        const course = courseData.find(course => course.id === parseInt(courseId));
        if (filteredSlotData.length > 0 && course) {
          setCourseData(filteredSlotData);
          setCourseInfo(course);
        } else {
          throw new Error('Course with CourseID not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [courseId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSlotChange = (e) => {
    const slot = e.target.value;
    setCurrentSlot(slot);
    const slotElement = slotRefs.current[slot];
    if (slotElement) {
      slotElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalPages = Math.ceil(courseData.length / ITEMS_PER_PAGE);
  const paginatedData = courseData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (courseData.length === 0 || !courseInfo) {
    return <p>Loading...</p>;
  }

  const toggleFiltersVisibility = () => {
    setFiltersVisible(!filtersVisible);
  };
  return (
    <>
      <div className='d-flex'>
        <div className="sidebar">
          <Layout style={{ height: "100vh" }}>
            <Sider collapsed={collapse} theme={darkTheme ? "dark" : "light"}>
              <Logo />
              <MenuList
                darkTheme={darkTheme}
                setSelectedMenu={setSelectedMenu}
                handleMenuClick={handleMenuClick}
              />
              <ToggleButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
            </Sider>
          </Layout>
        </div>
        <div className="content w-100">
          <Container className="mt-4 container">
            <Row>
              <Col xs="auto">
                <Link to="/home" className="pl-2">Home</Link>
              </Col>
              <Col xs="auto" className='text-black'>/</Col>
              <Col xs="auto" style={{ maxWidth: 'unset', color: 'black' }}>
                {courseInfo.title}
              </Col>
            </Row>

            <Row className="align-items-center mt-1">
              {filtersVisible && (
                <>
                  <Col md={2}>
                    <Form.Group controlId="activity-filter">
                      <Form.Label className='label'>Filter activities:</Form.Label>
                      <Form.Select>
                        <option value="">All Activities</option>
                        <option value="5">Hidden</option>
                        <option value="2">On Going</option>
                        <option value="4">Cancelled</option>
                        <option value="3">Completed</option>
                        <option value="1">Not Started</option>
                        <option value="6">Assignment or Feedback</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={1}>
                    <Form.Group controlId="slot-jump">
                      <Form.Label className='label'>Jump slot:</Form.Label>
                      <Form.Select onChange={handleSlotChange}>
                        {paginatedData.map(slot => (
                          <option key={slot.slot} value={`Slot: ${slot.slot}`}>{`Slot: ${slot.slot}`}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="class-name-select">
                      <Form.Label className='label'>Class Name:</Form.Label>
                      <Form.Select>
                        <option>{courseInfo.code}-APHL-SUMMER2024</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={2} className="mt-4">
                    <Button
                      as={Link}
                      to={`/material/${courseInfo.id}`}
                      variant="primary"
                      className="w-100"
                      style={{ fontSize: 'smaller' }}
                    >
                      LEARNING MATERIALS
                    </Button>
                  </Col>
                  <Col md={2} className="mt-4">
                    <Button
                      onClick={handleAssignShow}
                      variant="primary" className="w-100" style={{ fontSize: 'smaller' }}>
                      <span title="Assignments">ASSIGNMENT</span>
                    </Button>
                  </Col>
                </>
              )}
              <div md={2} className="mt-1">
                <Button
                  variant="link"
                  className="edu-button m-0 p-0 fs-10 text-decoration-none"
                  type="button"
                  onClick={toggleFiltersVisibility}
                >
                  SHOW/HIDE (Hiện/Ẩn)
                </Button>
              </div>
              <p className='fs-10 text-black'>TEACHERS: </p>
            </Row>
            <div className="scroll-container">
              {paginatedData.map((slot) => (
                <Collapse
                  key={slot.slot}
                  accordion
                  className='mt-3'
                  ref={el => slotRefs.current[slot.slot] = el}
                  style={{
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    backgroundColor: 'lightgray',
                    border: '1px solid black'
                  }}
                >
                  <Panel
                    header={
                      <div className="d-flex flex-column">
                        <div className="d-flex align-items-center">
                          <span className="slot" title={`Slot ${slot.slot}`}>{`Slot ${slot.slot}`}</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <CalendarOutlined />
                          <span className="time ml-1" title={slot.time}>
                            {slot.time}
                          </span>
                        </div>
                        <div className="slot-title mt-3">
                          <strong>
                            {slot.topics.map((topic, index) => (
                              <span key={index}>
                                {topic} <br />
                              </span>
                            ))}
                          </strong>
                        </div>
                      </div>
                    }
                    key={slot.slot}
                    activeKey={activePanel === slot.slot ? slot.slot : null}
                    onClick={() => setActivePanel(activePanel === slot.slot ? null : slot.slot)}
                  >
                    <Card className="p-1 slot-content">
                      <div className="no-content p-4">
                        Question <hr />
                        <div className="row combo-align-center">
                          <div className="row m-0 p-0 col-md-12 col-sm-12 activity-style">
                            <div className="col-md-9 col-sm-12">
                              <div className="activity-item">
                                <div className="activity-item__sumary">
                                  <Link to={`/activity/${courseInfo.id}`} className='text-decoration-none'>
                                    <div className="row combo-flex-center">
                                      <div className="col-md-11 col-10 pl-0 activity-item__link text-ellipsis">
                                        <span
                                          title="CQ1_Blackbox Test Design - Applied Techniques"
                                          className="activity-name text-ellipsis text-black"
                                          value=""
                                          style={{
                                            width: 'max-content',
                                            paddingLeft: '10px',
                                            display: 'inherit',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'initial',
                                          }}
                                        >
                                          CQ1_Title of CQ1 of slot____
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="position-relative col-md-3 col-sm-12 combo-flex-right">
                              <span title="Custom" className="activity-state-label text-danger fs-12 " value="Custom" style={{ paddingRight: '25%' }}>
                                Custom
                              </span>
                              <span title="Finished" className="pl-5 activity-state-label fs-12" value="Finished" style={{
                                background: '#dff6dd',
                                color: '#00ac47'
                              }}>
                                Finished
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="row combo-align-center">
                          <div className="row m-0 p-0 col-md-12 col-sm-12 activity-style">
                            <div className="col-md-9 col-sm-12">
                              <div className="activity-item">
                                <div className="activity-item__sumary">

                                  <Link to={`/activity/${courseInfo.id}`} className='text-decoration-none'>
                                    <div className="row combo-flex-center">
                                      <div className="col-md-11 col-10 pl-0 activity-item__link text-ellipsis">
                                        <span
                                          title="CQ1_Blackbox Test Design - Applied Techniques"
                                          className="activity-name text-ellipsis text-black"
                                          value=""
                                          style={{
                                            width: 'max-content',
                                            paddingLeft: '10px',
                                            display: 'inherit',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'initial',
                                          }}
                                        >
                                          CQ2_Title of CQ1 of slot____
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="position-relative col-md-3 col-sm-12 combo-flex-right">
                              <span title="Custom" className="activity-state-label text-danger fs-12 " value="Custom" style={{ paddingRight: '25%' }}>
                                Custom
                              </span>
                              <span title="Finished" className="pl-5 activity-state-label fs-12" value="Finished" style={{
                                background: '#dff6dd',
                                color: '#00ac47'
                              }}>
                                Finished
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="row combo-align-center">
                          <div className="row m-0 p-0 col-md-12 col-sm-12 activity-style">
                            <div className="col-md-9 col-sm-12">
                              <div className="activity-item">
                                <div className="activity-item__sumary">
                                  <Link to={`/activity/${courseInfo.id}`} className='text-decoration-none'>
                                    <div className="row combo-flex-center">
                                      <div className="col-md-11 col-10 pl-0 activity-item__link text-ellipsis">
                                        <span
                                          title="CQ1_Blackbox Test Design - Applied Techniques"
                                          className="activity-name text-ellipsis text-black"
                                          value=""
                                          style={{
                                            width: 'max-content',
                                            paddingLeft: '10px',
                                            display: 'inherit',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'initial',
                                          }}
                                        >
                                          CQ3_Title of CQ1 of slot____
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </div>

                              </div>
                            </div>
                            <div className="position-relative col-md-3 col-sm-12 combo-flex-right">
                              <span title="Custom" className="activity-state-label text-danger fs-12 " value="Custom" style={{ paddingRight: '25%' }}>
                                Custom
                              </span>
                              <span title="Finished" className="pl-5 activity-state-label fs-12" value="Finished" style={{
                                background: '#dff6dd',
                                color: '#00ac47'
                              }}>
                                Finished
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Panel>
                </Collapse>
              ))}
            </div>
            <div
              style={{
                width: '100%',
                paddingTop: '5px',
                position: 'sticky',
                backgroundColor: 'white',
                bottom: '20px',
                zIndex: '9999',
              }}
            >
              <div className="paging-filter paging-filter-slot d-flex flex-column align-items-center">
                <div className="d-flex justify-content-center">
                  <Button
                    className='button'
                    variant="primary"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                  >
                    First
                  </Button>
                  <Button
                    className='button'
                    variant="primary"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Prev
                  </Button>
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      className='button'
                      key={index + 1}
                      variant={currentPage === index + 1 ? "primary" : "light-50"}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button
                    className='button'
                    variant='light' >
                    {totalPages}
                  </Button>
                  <Button
                    className='button'
                    variant="primary"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </Button>
                  <Button
                    className='button'
                    variant="primary"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    Last
                  </Button>
                </div>
                <div className="page-info paging-slot">
                  10 of 20 items - 2 pages
                </div>
              </div>
            </div>
          </Container>

        </div >
      </div >
      <Assign show={isAssignModalVisible} handleClose={handleAssignClose} />
    </>
  );
};

export default CourseControls;
