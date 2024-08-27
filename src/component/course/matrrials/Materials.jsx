import React, { useState, useEffect, useRef } from 'react';
import { Card, Form, Button, Col, Row, Container, InputGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import './materials.css';
import { CalendarOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Layout, theme, Collapse } from 'antd';
import Logo from '../../sidebar/logo/Logo';
import MenuList from '../../sidebar/menu/Menu';
import ToggleButton from '../../sidebar/toggleButtun/ToggleButton';
import { SvgIcon } from '@mui/material';

const { Sider } = Layout;
const { Panel } = Collapse;

const ITEMS_PER_PAGE = 10;

const Materials = () => {
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState([]);
    const [courseInfo, setCourseInfo] = useState(null);
    const [darkTheme, setDarkTheme] = useState(true);
    const [collapse, setCollapse] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState("course");
    const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);
    const [isFaqModalVisible, setIsFaqModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

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

    const totalPages = Math.ceil(courseData.length / ITEMS_PER_PAGE);
    const paginatedData = courseData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    if (courseData.length === 0 || !courseInfo) {
        return <p>Loading...</p>;
    }
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
                            <Col xs="auto" className='text-black '>/  Course  /</Col>
                            <Col style={{ maxWidth: '300px' }}>
                                <Link
                                    to={`/course/${courseId}`}
                                    className='pr-0'
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        display: 'block',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {courseInfo.title}
                                </Link>
                            </Col>
                        </Row>

                        <Row className="align-items-center mt-1 text-black">
                            <Col md={6} sm={12} className="mb-2">
                                <InputGroup style={{ display: 'inline-flex', marginRight: '10px', width: '50%' }}>
                                    <Form.Control type="text" style={{ borderRadius: '5px' }} />
                                    <Button
                                        variant="primary"
                                        style={{ borderRadius: '10px' }}
                                        className="edu-button"
                                    >
                                        Search
                                    </Button>
                                </InputGroup>
                            </Col>
                            <Col md={6} sm={12} className="fs-12">
                                <i>
                                    The resource is personalized, exclusively designed for teachers and students of the course, creating a unique and private space where they can access and interact
                                </i>
                                &nbsp;
                                <i>
                                    <b>
                                        (Nguồn tài nguyên được cá nhân hóa, chỉ dành riêng cho giáo viên và học sinh của lớp môn, tạo nên một không gian riêng tư và độc đáo nơi thành viên lớp môn có thể truy cập và tương tác).
                                    </b>
                                </i>
                            </Col>
                        </Row>
                        <div className="mt-3 material-list">
                            <Row>
                                <Card className="p-2  w-25">
                                    <div className="material-card-item">
                                        <span className="d-block fs-12 text-ellipsis material-label">
                                            <b>Title: Report </b>
                                        </span>
                                        <span className="d-block fs-10 text-ellipsis material-label">
                                            Description:
                                        </span>
                                    </div>
                                    <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-vertical" />
                                    <Row className="m-0 p-0">
                                        <Col md={6} xs={8} className="m-0 p-0">
                                            <span className="d-block text-ellipsis fs-10">
                                                Day:
                                            </span>
                                            <span className="d-block text-ellipsis fs-10">
                                                Teachers:
                                            </span>
                                        </Col>
                                        <Col md={6} xs={2} className="m-0 p-0" style={{ textAlign: 'right' }}>
                                            <Button variant="link" className="p-0">
                                                <SvgIcon
                                                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium action-speed-icon"
                                                    focusable="false"
                                                    aria-hidden="true"
                                                    viewBox="0 0 24 24"
                                                    data-testid="ViewCompactIcon"
                                                >
                                                    <path d="M4 18h2.5v-2.5H4zm0-4.75h2.5v-2.5H4zM4 8.5h2.5V6H4zM17.5 6v2.5H20V6zM13 8.5h2.5V6H13zm4.5 9.5H20v-2.5h-2.5zm0-4.75H20v-2.5h-2.5zM8.5 18H11v-2.5H8.5zm4.5 0h2.5v-2.5H13zM8.5 8.5H11V6H8.5zm4.5 4.75h2.5v-2.5H13zm-4.5 0H11v-2.5H8.5z" />
                                                </SvgIcon>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className="p-2 w-25" style={{ marginLeft: '10px' }}>
                                    <div className="material-card-item">
                                        <span className="d-block fs-12 text-ellipsis material-label">
                                            <b>Title: Report </b>
                                        </span>
                                        <span className="d-block fs-10 text-ellipsis material-label">
                                            Description:
                                        </span>
                                    </div>
                                    <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-vertical" />
                                    <Row className="m-0 p-0">
                                        <Col md={6} xs={8} className="m-0 p-0">
                                            <span className="d-block text-ellipsis fs-10">
                                                Day:
                                            </span>
                                            <span className="d-block text-ellipsis fs-10">
                                                Teachers:
                                            </span>
                                        </Col>
                                        <Col md={6} xs={2} className="m-0 p-0" style={{ textAlign: 'right' }}>
                                            <Button variant="link" className="p-0">
                                                <SvgIcon
                                                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium action-speed-icon"
                                                    focusable="false"
                                                    aria-hidden="true"
                                                    viewBox="0 0 24 24"
                                                    data-testid="ViewCompactIcon"
                                                >
                                                    <path d="M4 18h2.5v-2.5H4zm0-4.75h2.5v-2.5H4zM4 8.5h2.5V6H4zM17.5 6v2.5H20V6zM13 8.5h2.5V6H13zm4.5 9.5H20v-2.5h-2.5zm0-4.75H20v-2.5h-2.5zM8.5 18H11v-2.5H8.5zm4.5 0h2.5v-2.5H13zM8.5 8.5H11V6H8.5zm4.5 4.75h2.5v-2.5H13zm-4.5 0H11v-2.5H8.5z" />
                                                </SvgIcon>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Row>
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
                                        variant="white"
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        <LeftCircleOutlined />
                                    </Button>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <Button
                                            key={index + 1}
                                            variant={currentPage === index + 1 ? "primary" : "light-50"}
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </Button>
                                    ))}

                                    <Button
                                        variant="white"
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        <RightCircleOutlined />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default Materials;
