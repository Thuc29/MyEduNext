import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Tab, Tabs, Collapse, ListGroup, Form, Tooltip, Badge, Modal, Table, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FaUser, FaAngleDown, FaAngleUp, FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import { Input, Layout, Select } from 'antd';
import './activities.css';
import Logo from '../../sidebar/logo/Logo';
import MenuList from '../../sidebar/menu/Menu';
import ToggleButton from '../../sidebar/toggleButtun/ToggleButton';
import { BarChartOutlined, CalendarOutlined, ClockCircleOutlined, CommentOutlined, DotChartOutlined, LineChartOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';

const { Sider } = Layout;
const { Panel } = Collapse;

const Activities = () => {
     const { courseId } = useParams();
     const [courseData, setCourseData] = useState([]);
     const [courseInfo, setCourseInfo] = useState(null);
     const [darkTheme, setDarkTheme] = useState(true);
     const [collapse, setCollapse] = useState(true);
     const [selectedMenu, setSelectedMenu] = useState("course");
     const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);
     const [isFaqModalVisible, setIsFaqModalVisible] = useState(false);
     const [key, setKey] = useState('group');
     const [showStudents, setShowStudents] = useState(false);
     const [comments, setComments] = useState([]);
     const [comment, setComment] = useState('');
     const [editingCommentIndex, setEditingCommentIndex] = useState(null);
     const [editCommentText, setEditCommentText] = useState('');
     const [showModalMeeting, setShowModalMeeting] = useState(false);
     const [showModalGrade, setShowModalGrade] = useState(false);
     const [isReplyVisible, setIsReplyVisible] = useState(false);
     const [replyText, setReplyText] = useState('');
     const [replies, setReplies] = useState([]);
     const [editingIndex, setEditingIndex] = useState(null);
     const [editText, setEditText] = useState('');
     const [showSuccessMessage, setShowSuccessMessage] = useState(false);


     const handleShowGrade = () => setShowModalGrade(true);
     const handleCloseGrade = () => setShowModalGrade(false);
     const handleShowMeeting = () => setShowModalMeeting(true);
     const handleCloseMeeting = () => setShowModalMeeting(false);


     useEffect(() => {
          const fetchData = async () => {
               try {
                    const [slotResponseSWT, slotResponseSWP, slotResponseFER, slotResponseSWR, courseResponse, commentsResponse] = await Promise.all([
                         fetch('http://localhost:9999/slotSWT'),
                         fetch('http://localhost:9999/slotSWP'),
                         fetch('http://localhost:9999/slotFER'),
                         fetch('http://localhost:9999/slotSWR'),
                         fetch('http://localhost:9999/course'),
                         fetch('http://localhost:9999/comments')
                    ]);

                    if (!slotResponseSWT.ok || !slotResponseSWP.ok || !slotResponseFER.ok || !slotResponseSWR.ok || !courseResponse.ok || !commentsResponse.ok) {
                         throw new Error('Failed to fetch data');
                    }

                    const slotDataSWT = await slotResponseSWT.json();
                    const slotDataSWP = await slotResponseSWP.json();
                    const slotDataFER = await slotResponseFER.json();
                    const slotDataSWR = await slotResponseSWR.json();
                    const courseData = await courseResponse.json();
                    const commentsData = await commentsResponse.json();

                    const allSlotData = [...slotDataSWT, ...slotDataSWP, ...slotDataFER, ...slotDataSWR];
                    const filteredSlotData = allSlotData.filter(item => item.courseId === parseInt(courseId));
                    const course = courseData.find(course => course.id === parseInt(courseId));

                    if (filteredSlotData.length > 0 && course) {
                         setCourseData(filteredSlotData);
                         setCourseInfo(course);
                    } else {
                         throw new Error('Course with CourseID not found');
                    }
                    setComments(commentsData);
               } catch (error) {
                    console.error('Error fetching data:', error);
               }
          };
          fetchData();
     }, [courseId]);

     if (courseData.length === 0 || !courseInfo) {
          return <p>Loading...</p>;
     }

     const students = [
          {
               id: 'HE161510',
               name: 'Nguyễn Minh Hoàng',
               email: 'hoangnmhe161510@fpt.edu.vn',
               status: 'Offline'
          },
          {
               id: 'HE170497',
               name: 'Nguyễn Đắc Hợp',
               email: 'hopndhe170497@fpt.edu.vn',
               status: 'Offline'
          },
          {
               id: 'HE170775',
               name: 'Đỗ Quang Huy',
               email: 'huydqhe170775@fpt.edu.vn',
               status: 'Offline'
          },
          {
               id: 'HE171729',
               name: 'Trần Danh Thực',
               email: 'thuctdhe171729@fpt.edu.vn',
               status: 'Offline'
          },
          {
               id: 'HE173079',
               name: 'Nguyễn Quang Minh',
               email: 'minhnqhe173079@fpt.edu.vn',
               status: 'Offline'
          }
          // Add more students here if needed
     ];

     const handleClick = () => {
          setShowStudents(!showStudents);
     };

     const handleAddComment = async () => {
          if (comment.trim()) {
               const newComment = {
                    text: comment,
                    timestamp: new Date().toISOString()
               };

               try {
                    const response = await fetch('http://localhost:9999/comments', {
                         method: 'POST',
                         headers: {
                              'Content-Type': 'application/json'
                         },
                         body: JSON.stringify(newComment)
                    });

                    if (!response.ok) {
                         throw new Error('Failed to add comment');
                    }

                    const addedComment = await response.json();
                    setComments([...comments, addedComment]);
                    setComment('');
               } catch (error) {
                    console.error('Error adding comment:', error);
               }
          }
     };

     const handleEditClickComment = (index) => {
          setEditingCommentIndex(index);
          setEditCommentText(comments[index].text);
     };

     const handleDeleteClickComment = (index) => {
          const updatedComments = comments.filter((_, i) => i !== index);
          setComments(updatedComments);
     };

     const handleEditSubmitComment = (index) => {
          const updatedComments = [...comments];
          updatedComments[index].text = editCommentText;
          setComments(updatedComments);
          setEditingCommentIndex(null);
     };

     const handleEditChangeComment = (event) => {
          setEditCommentText(event.target.value);
     };


     const Rating = ({ value }) => {
          return (
               <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                         <FaStar
                              key={star}
                              color={value >= star ? 'gold' : 'grey'}
                              size={16}
                         />
                    ))}
               </div>
          );
     };

     const handleReplyClick = () => {
          setIsReplyVisible(!isReplyVisible);
     };

     const handleReplyChange = (e) => {
          setReplyText(e.target.value);
     };

     const handleReplySubmit = (e) => {
          e.preventDefault();
          if (replyText.trim() === '') return;

          // Add the new reply to the list of replies
          setReplies([...replies, replyText]);
          setReplyText('');
          setIsReplyVisible(false);
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 3000);
     };

     const handleEditClick = (index) => {
          setEditingIndex(index);
          setEditText(replies[index]);
     };

     const handleEditChange = (e) => {
          setEditText(e.target.value);
     };

     const handleEditSubmit = (index) => {
          const updatedReplies = replies.map((reply, i) =>
               i === index ? editText : reply
          );
          setReplies(updatedReplies);
          setEditingIndex(null);
          setEditText('');
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 3000);
     };

     const handleDeleteClick = (index) => {
          const updatedReplies = replies.filter((_, i) => i !== index);
          setReplies(updatedReplies);
     };

     return (
          <>
               <div className='d-flex'>
                    <div className="sidebar">
                         <Layout style={{ height: "160vh" }}>
                              <Sider collapsed={collapse} theme={darkTheme ? "dark" : "light"}>
                                   <Logo />
                                   <MenuList
                                        darkTheme={darkTheme}
                                        setSelectedMenu={setSelectedMenu}
                                        handleMenuClick={(key) => {
                                             if (key === "support") setIsSupportModalVisible(true);
                                             else if (key === "faq") setIsFaqModalVisible(true);
                                             setSelectedMenu(key);
                                        }}
                                   />
                                   <ToggleButton darkTheme={darkTheme} toggleTheme={() => setDarkTheme(!darkTheme)} />
                              </Sider>
                         </Layout>
                    </div>
                    <div className="content w-100">
                         <Container className="mt-4 container">
                              <Row>
                                   <Col xs="auto">
                                        <Link to="/home" className="pl-2">Home</Link>
                                   </Col>
                                   <Col xs="auto" className='pl-2 text-black' > / </Col>
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
                                   <Col xs="auto" className='pl-2 text-black' > / </Col>
                                   <Col xs="auto" className='pl-2'>
                                        <Link to="/session/detail" className="pl-2">Slot 1</Link>
                                   </Col>
                                   <Col xs="auto" className='pl-2 text-black' > / </Col>
                                   <Col xs="auto" className='pl-2 text-black' > CQ </Col>
                              </Row>
                              <div className='mg-b-24 mt-3 text-black'>
                                   <h2>(Question) Title CQ of course</h2>
                              </div>
                              <Row className='d-flex'>
                                   <Col lg={7} xl={8} className='text-black'>
                                        <Card className='p-3 bg-light'>
                                             <h4>Content</h4> <hr />
                                             <p>What are the key features of React</p>
                                        </Card>
                                        <div className="interaction-state mb-2 mt-3 w-100-percent">
                                             Discussion time has been started.<br />
                                             Students can comment and vote for comments during this time.<br />
                                             Current Timezone: You are currently in <b>Asia/Saigon</b> time zone <b> (GMT+7)</b></div>
                                        <Tabs
                                             id="controlled-tab-example"
                                             activeKey={key}
                                             onSelect={(k) => setKey(k)}
                                             className="mb-3 justify-content-center"
                                        >
                                             <Tab eventKey="group" title="GROUP">
                                             </Tab>
                                             <Tab eventKey="discuss" title="DISCUSS">
                                             </Tab>
                                             <Tab eventKey="grade" title="GRADE">
                                             </Tab>
                                             <Tab eventKey="message" title="TEACHER'S MESSAGE">
                                             </Tab>
                                        </Tabs>
                                        {key === "group" && (
                                             <div>
                                                  <Card className='p-3 bg-light' onClick={handleClick}>
                                                       <div className='d-flex justify-content-between align-items-center'>
                                                            <div className='d-flex align-items-center'>
                                                                 <FaUser className='me-2' />
                                                                 <b>Group 1 ({students.length} students)</b> - <i>Your group</i>
                                                            </div>
                                                            <div>
                                                                 {showStudents ? <FaAngleUp /> : <FaAngleDown />}
                                                            </div>
                                                       </div>
                                                  </Card>
                                                  <Collapse in={showStudents}>
                                                       <div className='border'>
                                                            {students.map((student, index) => (
                                                                 <div key={index} className='mt-3 p-2 '>
                                                                      <div className='d-flex justify-content-between align-items-center'>
                                                                           <div className='d-flex align-items-center'>
                                                                                <FaUser className='me-2' />
                                                                                <div>
                                                                                     <b>{student.id}</b>
                                                                                     <div>{student.name}</div>
                                                                                     <div className='fs-10 text-secondary'><i>{student.email}</i></div>
                                                                                </div>
                                                                           </div>
                                                                           <div>
                                                                                <span className='badge bg-secondary'>{student.status}</span>
                                                                           </div>
                                                                      </div>
                                                                 </div>
                                                            ))}
                                                       </div>
                                                  </Collapse>
                                             </div>
                                        )}
                                        {key === 'discuss' && (
                                             <div className='comment-section'>
                                                  <div className='custom-select d-grid justify-content-center'>
                                                       <label> Select </label>
                                                       <select style={{ borderRadius: '5px', width: '150%', height: '40px' }}>
                                                            <option value="1">Inside group</option>
                                                            <option value="2">Voted</option>
                                                       </select>
                                                  </div>

                                                  <Row className="mb-3 mt-3">
                                                       <Col>
                                                            <Form.Control
                                                                 as="textarea"
                                                                 rows={3}
                                                                 placeholder="Enter your comment..."
                                                                 value={comment}
                                                                 onChange={(e) => setComment(e.target.value)}
                                                                 style={{ borderRadius: '10px', padding: '10px', borderColor: '#ddd' }}
                                                            />
                                                       </Col>
                                                  </Row>
                                                  <Row className="mb-3">
                                                       <Col>
                                                            <Button variant="primary" onClick={handleAddComment}>
                                                                 Send
                                                            </Button>
                                                       </Col>
                                                  </Row>
                                                  <Row>
                                                       <Col>
                                                            <ListGroup>
                                                                 {comments.map((comment, index) => (
                                                                      <div className='mb-5' key={index}>
                                                                           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                                                <img
                                                                                     src="profile-placeholder.png"
                                                                                     alt="Profile"
                                                                                     style={{
                                                                                          width: '40px',
                                                                                          height: '40px',
                                                                                          borderRadius: '50%',
                                                                                          marginRight: '10px',
                                                                                     }}
                                                                                />
                                                                                <div>
                                                                                     <div style={{ fontWeight: 'bold' }}>Tran Danh Thuc (Group 1)</div>
                                                                                     <div style={{ fontSize: '12px', color: '#888' }}>{new Date(comment.timestamp).toLocaleString()}</div>
                                                                                </div>
                                                                           </div>
                                                                           <ListGroup.Item
                                                                                className="mb-2"
                                                                                style={{
                                                                                     borderRadius: '10px',
                                                                                     padding: '10px',
                                                                                     border: '1px solid #ddd',
                                                                                }}
                                                                           >
                                                                                <div className='bg-light p-2'>
                                                                                     {editingCommentIndex === index ? (
                                                                                          <Form onSubmit={(e) => {
                                                                                               e.preventDefault();
                                                                                               handleEditSubmitComment(index);
                                                                                          }}>
                                                                                               <Form.Group controlId="editCommentText">
                                                                                                    <Form.Control
                                                                                                         type="text"
                                                                                                         value={editCommentText}
                                                                                                         onChange={handleEditChangeComment}
                                                                                                    />
                                                                                               </Form.Group>
                                                                                               <Button variant="primary" type="submit">
                                                                                                    Save
                                                                                               </Button>
                                                                                               <Button
                                                                                                    variant="secondary"
                                                                                                    className="ml-2"
                                                                                                    onClick={() => setEditingCommentIndex(null)}
                                                                                               >
                                                                                                    Cancel
                                                                                               </Button>
                                                                                          </Form>
                                                                                     ) : (
                                                                                          <>
                                                                                               {comment.text}
                                                                                               <span
                                                                                                    className="position-absolute top-0 end-0 p-2"
                                                                                                    style={{ cursor: 'pointer' }}
                                                                                               >
                                                                                                    <FaEdit
                                                                                                         onClick={() => handleEditClickComment(index)}
                                                                                                         title="Edit"
                                                                                                         className="me-2"
                                                                                                    />
                                                                                                    <FaTrash
                                                                                                         onClick={() => handleDeleteClickComment(index)}
                                                                                                         title="Delete"
                                                                                                    />
                                                                                               </span>
                                                                                          </>
                                                                                     )}
                                                                                </div>
                                                                           </ListGroup.Item>
                                                                           <div>
                                                                                <div className="comment">
                                                                                     <div className='d-flex mt-2'>
                                                                                          <span
                                                                                               title="Reply"
                                                                                               className="reply-cmt"
                                                                                               style={{ cursor: 'pointer', paddingRight: '10px' }}
                                                                                               onClick={handleReplyClick}
                                                                                          >
                                                                                               Reply
                                                                                          </span>
                                                                                          <span className="vote-cmt">Vote</span>
                                                                                     </div>
                                                                                     {isReplyVisible && (
                                                                                          <Form onSubmit={handleReplySubmit} className='mt-2'>
                                                                                               <Form.Group controlId="replyText">
                                                                                                    <Form.Control
                                                                                                         type="text"
                                                                                                         placeholder="Write a reply..."
                                                                                                         value={replyText}
                                                                                                         onChange={handleReplyChange}
                                                                                                    />
                                                                                               </Form.Group>
                                                                                               <Button variant="primary" type="submit">
                                                                                                    Submit Reply
                                                                                               </Button>
                                                                                          </Form>
                                                                                     )}
                                                                                     {showSuccessMessage && (
                                                                                          <Alert variant="success" className='mt-2'>
                                                                                               Reply submitted successfully!
                                                                                          </Alert>
                                                                                     )}
                                                                                     <div className="replies mt-3">
                                                                                          {replies.length > 0 && (
                                                                                               <ul className="list-unstyled">
                                                                                                    {replies.map((reply, index) => (
                                                                                                         <li key={index} className="border p-2 mb-2 position-relative">
                                                                                                              {editingIndex === index ? (
                                                                                                                   <Form
                                                                                                                        onSubmit={(e) => {
                                                                                                                             e.preventDefault();
                                                                                                                             handleEditSubmit(index);
                                                                                                                        }}
                                                                                                                   >
                                                                                                                        <Form.Group controlId="editReplyText">
                                                                                                                             <Form.Control
                                                                                                                                  type="text"
                                                                                                                                  value={editText}
                                                                                                                                  onChange={handleEditChange}
                                                                                                                             />
                                                                                                                        </Form.Group>
                                                                                                                        <Button variant="primary" type="submit">
                                                                                                                             Save
                                                                                                                        </Button>
                                                                                                                        <Button
                                                                                                                             variant="secondary"
                                                                                                                             className="ml-2"
                                                                                                                             onClick={() => setEditingIndex(null)}
                                                                                                                        >
                                                                                                                             Cancel
                                                                                                                        </Button>
                                                                                                                   </Form>
                                                                                                              ) : (
                                                                                                                   <>
                                                                                                                        {reply}
                                                                                                                        <span
                                                                                                                             className="position-absolute top-0 end-0 p-2"
                                                                                                                             style={{ cursor: 'pointer' }}
                                                                                                                        >
                                                                                                                             <FaEdit
                                                                                                                                  onClick={() => handleEditClick(index)}
                                                                                                                                  title="Edit"
                                                                                                                                  className="me-2"
                                                                                                                             />
                                                                                                                             <FaTrash
                                                                                                                                  onClick={() => handleDeleteClick(index)}
                                                                                                                                  title="Delete"
                                                                                                                             />
                                                                                                                        </span>
                                                                                                                   </>
                                                                                                              )}
                                                                                                         </li>
                                                                                                    ))}
                                                                                               </ul>
                                                                                          )}
                                                                                     </div>
                                                                                </div>
                                                                           </div>
                                                                      </div>
                                                                 ))}
                                                            </ListGroup>
                                                       </Col>
                                                  </Row>
                                             </div>

                                        )}

                                        {key === 'grade' && (
                                             <div className='grade-section'>
                                                  <Card style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)' }}>
                                                       <Card.Title className='pt-2 bg-light' style={{ paddingLeft: '20px' }}>Functions</Card.Title>
                                                       <hr className='m-0' />
                                                       <Card.Body className='d-flex'>
                                                            <Col md={8}>
                                                                 <div className='d-flex'>
                                                                      <Button className='text-get' style={{ marginRight: '10px', backgroundColor: '#38CB89', border: 'none' }}>GET INDIVIUAL</Button>
                                                                      <Button className='text-get'>REFRESH</Button>
                                                                 </div>
                                                                 <div class="m-3">
                                                                      <span>Add round: Add a round designed for groups to present, critique.</span>
                                                                      <br />
                                                                      <span>Get grade: Average score of the participating groups in the round</span>
                                                                      <br /><span>Get indiviual: Average score of the participating students the rounds</span>
                                                                      <br /><span>Timer: The set time is reached, a round will automatically stop when it expires </span>
                                                                      <br /><span class="text-warning">Warning: The "Round" is still calculated as "active" even if its status is "cancel."</span>
                                                                 </div>
                                                            </Col>
                                                            <Col md={4} >
                                                                 <div className='text-center'> <ClockCircleOutlined /></div>
                                                                 <div className='text-center' >
                                                                      0: Unlimited
                                                                 </div>
                                                            </Col>
                                                       </Card.Body>
                                                  </Card>
                                                  <Card className="mt-3">
                                                       <ListGroup.Item as="li" className="grade-round round-12675">
                                                            <ListGroup as="ul" className="none-list">
                                                                 <ListGroup.Item as="li" className="head-round m-0 position-relative">
                                                                      <Badge bg="primary" className="status-chip">
                                                                           On Going
                                                                      </Badge>
                                                                      <span title="Round 1" className="ms-2" value="Round 1">Round 1</span>
                                                                      <span title=" " className="text-danger fs-10" value=" "> </span>
                                                                 </ListGroup.Item>
                                                                 <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center present-line round-line">
                                                                      <div className=" d-flex align-items-center round-line-header">
                                                                           <span className="head-line">
                                                                                <span className="title-rv-ps">Presenting</span>
                                                                                <Tooltip title="Teachers and the other groups can grade on the presenting group. If you are a member of the presenting group, you cannot do the grading in this round">
                                                                                     <QuestionCircleOutlined className="ms-1" />
                                                                                </Tooltip>

                                                                           </span>
                                                                           <b>Group 1</b>
                                                                      </div>
                                                                      <div className="round-line-state">
                                                                           <span title="Not Graded" className="grade-label fs-14 text-danger" value="Not Graded">Not Graded</span>
                                                                      </div>
                                                                      <div className="round-line-point">0.0/4.0</div>
                                                                 </ListGroup.Item>
                                                                 <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center review-line round-line">
                                                                      <div className=" d-flex align-items-center round-line-header">
                                                                           <span className="head-line">
                                                                                <span className="title-rv-ps">Reviewing</span>
                                                                                <Tooltip title="Only teachers can grade on the reviewing group.">
                                                                                     <QuestionCircleOutlined className="ms-1" />
                                                                                </Tooltip>

                                                                           </span>
                                                                           <b>Group 2</b>
                                                                      </div>
                                                                      <div className="round-line-state">
                                                                           <span title="Graded" className="grade-label fs-14 text-success" value="Graded">Graded</span>
                                                                      </div>
                                                                      <div className="round-line-point">3.0/3.0</div>
                                                                 </ListGroup.Item>
                                                                 <ListGroup.Item as="li" className="fs-10 d-flex justify-content-between">
                                                                      <b>Created by: hoannn6@fpt.edu.vn</b>
                                                                      <b>Latest: N/A</b>
                                                                 </ListGroup.Item>
                                                            </ListGroup>
                                                       </ListGroup.Item>
                                                  </Card>
                                             </div>
                                        )}

                                        {key === 'message' && (
                                             <div className='d-flex message-section justify-content-center'>
                                                  <Row>
                                                       <Col>
                                                            <div className=" d-flex no-comments no-data text-secondary">
                                                                 <Icon component={CommentOutlined} style={{ fontSize: '2rem' }} />
                                                                 <p>THERE ARE NO COMMENTS!</p>
                                                            </div>
                                                       </Col>
                                                  </Row>
                                             </div>
                                        )}
                                   </Col>

                                   <Col lg={5} xl={4} className='text-black'>
                                        <div>
                                             <h4>Group Meeting</h4>
                                             <i className="text-danger">No meeting video link, click the button below to update</i>
                                             <Button className="mt-3 w-100" onClick={handleShowMeeting}>
                                                  UPDATE
                                             </Button>
                                             <Modal show={showModalMeeting} onHide={handleCloseMeeting}>
                                                  <Modal.Header closeButton>
                                                       <Modal.Title>Update Meeting Video Link</Modal.Title>
                                                  </Modal.Header>
                                                  <Modal.Body>
                                                       <p>Add meeting video code</p> <br />
                                                       <div className=" d-flex meeting-form-control">
                                                            <span title="https://meet.google.com/" className="me-1">
                                                                 https://meet.google.com/
                                                            </span>
                                                            <Input placeholder="code" />

                                                       </div>
                                                  </Modal.Body>
                                                  <Modal.Footer>
                                                       <Button variant="light" onClick={handleCloseMeeting}>
                                                            Close
                                                       </Button>
                                                       <Button variant="primary" onClick={() => {
                                                            handleCloseMeeting();
                                                       }}>
                                                            Save Changes
                                                       </Button>
                                                  </Modal.Footer>
                                             </Modal>
                                        </div>
                                        <div className='mt-5'>
                                             <h4> Individual grade ?</h4>
                                             <i className='text-danger'>You need grade on groupmates to view your points </i>
                                             <Button className='mt-3 w-100' onClick={handleShowGrade}> GRADE ON GROUPMATES</Button>
                                             <Modal show={showModalGrade} onHide={handleCloseGrade} size="xl">
                                                  <Modal.Header closeButton>
                                                       <Modal.Title>Grading For Groupmates</Modal.Title>
                                                  </Modal.Header>
                                                  <Modal.Body>
                                                       <p>You are grading for groupmates (Click on stars to grade) </p> <br />
                                                       <div className="">
                                                            <Table striped bordered hover responsive>
                                                                 <thead>
                                                                      <tr>
                                                                           <th>Name</th>
                                                                           <th>Roll Number</th>
                                                                           <th style={{ width: '150px' }}>Hard-working</th>
                                                                           <th style={{ width: '150px' }}>Good knowledge/Skills</th>
                                                                           <th style={{ width: '150px' }}>Teamworking</th>
                                                                           <th>Total</th>
                                                                      </tr>
                                                                 </thead>
                                                                 <tbody>
                                                                      {students.map((student, index) => (
                                                                           <tr key={index}>
                                                                                <td>{student.name}</td>
                                                                                <td>{student.id}</td>
                                                                                <td><Rating value={1} /></td>
                                                                                <td><Rating value={2} /></td>
                                                                                <td><Rating value={3} /></td>
                                                                                <td>3.0</td>
                                                                           </tr>
                                                                      ))}
                                                                 </tbody>
                                                            </Table>
                                                       </div>
                                                  </Modal.Body>
                                                  <Modal.Footer>
                                                       <Button variant="light" onClick={handleCloseGrade}>
                                                            Close
                                                       </Button>
                                                       <Button variant="primary" onClick={() => {
                                                            handleCloseGrade();
                                                       }}>
                                                            Grade
                                                       </Button>
                                                  </Modal.Footer>
                                             </Modal>
                                        </div>
                                        <div className='mt-5'>
                                             <h4>Chart summary</h4>
                                             <div className='d-flex justify-content-around'>
                                                  <Card> <BarChartOutlined style={{ fontSize: '40px' }} /></Card>
                                                  <Card> <DotChartOutlined style={{ fontSize: '40px' }} /> </Card>
                                                  <Card><LineChartOutlined style={{ fontSize: '40px' }} /></Card>
                                             </div>
                                        </div>
                                        <div>
                                             <h4>Call video</h4>
                                             <Button className='mt-3 w-50 bg-white text-primary'>JOIN STEAM </Button>
                                        </div>
                                        <div className="mt-5">
                                             <h4>Pass criteria</h4>
                                             <div class="question-statistics ">
                                                  <div>View question</div>
                                                  <div className='d-flex justify-content-between'>
                                                       <div>No. of comments posted</div>
                                                       <div>1</div>
                                                  </div>
                                                  <div className='d-flex justify-content-between'>
                                                       <div>No. of stars rated by others</div>
                                                       <div>1</div>
                                                  </div>
                                                  <div className='d-flex justify-content-between'>
                                                       <div>No. of votes</div>
                                                       <div>1</div>
                                                  </div>
                                             </div>
                                        </div>

                                        <div className='mt-5'>
                                             <h4>Table os contents</h4>
                                             <span className='fs-10'>Question</span>
                                             <ListGroup.Item
                                                  as="button"
                                                  disabled
                                                  className="p-2 MuiListItem-root Mui-disabled MuiListItem-gutters MuiListItem-padding Mui-selected color-selected-content d-flex bg-light"
                                                  role="button"
                                                  aria-disabled="true"
                                             >
                                                  <div className="MuiListItemAvatar-root">
                                                       <img
                                                            src="data:image/svg+xml,%3csvg%20width='28'%20height='28'%20viewBox='0%200%2028%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0%208C0%203.58172%203.58172%200%208%200H20C24.4183%200%2028%203.58172%2028%208V20C28%2024.4183%2024.4183%2028%2020%2028H8C3.58172%2028%200%2024.4183%200%2020V8Z'%20fill='%23FD9246'%3e%3c/path%3e%3cg%20clip-path='url(%23clip0_5268_6432)'%3e%3cpath%20d='M23.2361%2019.9705C23.7368%2019.2061%2024%2018.3632%2024%2017.5158C24%2014.6848%2021.2575%2012.3746%2017.8333%2012.2539C17.0355%2014.6348%2014.659%2016.6282%2011.1702%2016.8785C11.1393%2017.0891%2011.1094%2017.3%2011.1094%2017.5159C11.1094%2020.4238%2014.0007%2022.7893%2017.5547%2022.7893C18.7729%2022.7893%2019.9557%2022.5049%2020.9925%2021.9642L23.2178%2022.7555C23.4266%2022.8301%2023.6668%2022.78%2023.8289%2022.6171C23.9886%2022.4568%2024.0418%2022.2188%2023.9657%2022.0054L23.2361%2019.9705ZM15.7968%2018.1018C15.7968%2018.4256%2015.5348%2018.6877%2015.2109%2018.6877C14.887%2018.6877%2014.625%2018.4256%2014.625%2018.1018V16.9299C14.625%2016.606%2014.887%2016.3439%2015.2109%2016.3439C15.5348%2016.3439%2015.7968%2016.606%2015.7968%2016.9299V18.1018ZM18.1406%2018.1018C18.1406%2018.4256%2017.8785%2018.6877%2017.5546%2018.6877C17.2308%2018.6877%2016.9687%2018.4256%2016.9687%2018.1018V16.9299C16.9687%2016.606%2017.2308%2016.3439%2017.5546%2016.3439C17.8785%2016.3439%2018.1406%2016.606%2018.1406%2016.9299V18.1018ZM20.4843%2018.1018C20.4843%2018.4256%2020.2223%2018.6877%2019.8984%2018.6877C19.5745%2018.6877%2019.3125%2018.4256%2019.3125%2018.1018V16.9299C19.3125%2016.606%2019.5745%2016.3439%2019.8984%2016.3439C20.2223%2016.3439%2020.4843%2016.606%2020.4843%2016.9299V18.1018Z'%20fill='white'%3e%3c/path%3e%3cpath%20d='M10.4453%205.21122C9.22594%205.21122%208.04379%205.4956%207.0075%206.03634L4.78219%205.24497C4.56934%205.16888%204.33074%205.22267%204.17109%205.38345C4.01145%205.54368%203.95824%205.78169%204.03434%205.99513L4.76391%208.02989C4.2632%208.79435%204%209.6372%204%2010.4847C4%2013.3926%206.89137%2015.7581%2010.4453%2015.7581C13.9125%2015.7581%2016.8906%2013.4692%2016.8906%2010.4847C16.8906%207.57669%2013.9993%205.21122%2010.4453%205.21122ZM10.4453%2013.4143C10.1217%2013.4143%209.85938%2013.152%209.85938%2012.8284C9.85938%2012.5047%2010.1217%2012.2425%2010.4453%2012.2425C10.7689%2012.2425%2011.0312%2012.5047%2011.0312%2012.8284C11.0312%2013.152%2010.7689%2013.4143%2010.4453%2013.4143ZM11.0387%2010.9681C11.0387%2011.2914%2010.7726%2011.605%2010.4493%2011.605C10.1254%2011.605%209.85934%2011.3944%209.85934%2011.0706C9.85934%2010.4795%2010.1746%2010.0326%2010.6432%209.86493C10.875%209.78138%2011.0312%209.55993%2011.0312%209.31275C11.0312%208.98946%2010.7686%208.72681%2010.4453%208.72681C10.122%208.72681%209.85934%208.98946%209.85934%209.31275C9.85934%209.63661%209.59727%209.89868%209.2734%209.89868C8.94953%209.89868%208.68746%209.63661%208.68746%209.31275C8.68746%208.34345%209.47598%207.55493%2010.4453%207.55493C11.4146%207.55493%2012.2031%208.34345%2012.2031%209.31275C12.2031%2010.0526%2011.7351%2010.7181%2011.0387%2010.9681Z'%20fill='white'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_5268_6432'%3e%3crect%20width='20'%20height='20'%20fill='white'%20transform='translate(4%204)'%3e%3c/rect%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                                            alt="Avatar"
                                                       />
                                                  </div>
                                                  <Row className="w-100 text-black d-flex">
                                                       <Col xs={8} className="text-ellipsis">
                                                            <span
                                                                 title="What are the key features of React"
                                                                 className="title"
                                                                 style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'initial' }}
                                                            >
                                                                 What are the key features of React
                                                            </span>
                                                       </Col>
                                                       <Col xs={4}>
                                                            <div className="activity-state-label on-going">
                                                                 <span title="On-going" style={{
                                                                      color: '#0078d4',
                                                                      background: '#eff6fc'
                                                                 }}>
                                                                      On-going</span>
                                                            </div>
                                                       </Col>
                                                  </Row>
                                             </ListGroup.Item>
                                             <ListGroup.Item
                                                  as="button"
                                                  disabled
                                                  className="p-2 MuiListItem-root Mui-disabled MuiListItem-gutters MuiListItem-padding Mui-selected color-selected-content d-flex bg-light"
                                                  role="button"
                                                  aria-disabled="true"
                                             >
                                                  <div className="MuiListItemAvatar-root">
                                                       <img
                                                            src="data:image/svg+xml,%3csvg%20width='28'%20height='28'%20viewBox='0%200%2028%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0%208C0%203.58172%203.58172%200%208%200H20C24.4183%200%2028%203.58172%2028%208V20C28%2024.4183%2024.4183%2028%2020%2028H8C3.58172%2028%200%2024.4183%200%2020V8Z'%20fill='%23FD9246'%3e%3c/path%3e%3cg%20clip-path='url(%23clip0_5268_6432)'%3e%3cpath%20d='M23.2361%2019.9705C23.7368%2019.2061%2024%2018.3632%2024%2017.5158C24%2014.6848%2021.2575%2012.3746%2017.8333%2012.2539C17.0355%2014.6348%2014.659%2016.6282%2011.1702%2016.8785C11.1393%2017.0891%2011.1094%2017.3%2011.1094%2017.5159C11.1094%2020.4238%2014.0007%2022.7893%2017.5547%2022.7893C18.7729%2022.7893%2019.9557%2022.5049%2020.9925%2021.9642L23.2178%2022.7555C23.4266%2022.8301%2023.6668%2022.78%2023.8289%2022.6171C23.9886%2022.4568%2024.0418%2022.2188%2023.9657%2022.0054L23.2361%2019.9705ZM15.7968%2018.1018C15.7968%2018.4256%2015.5348%2018.6877%2015.2109%2018.6877C14.887%2018.6877%2014.625%2018.4256%2014.625%2018.1018V16.9299C14.625%2016.606%2014.887%2016.3439%2015.2109%2016.3439C15.5348%2016.3439%2015.7968%2016.606%2015.7968%2016.9299V18.1018ZM18.1406%2018.1018C18.1406%2018.4256%2017.8785%2018.6877%2017.5546%2018.6877C17.2308%2018.6877%2016.9687%2018.4256%2016.9687%2018.1018V16.9299C16.9687%2016.606%2017.2308%2016.3439%2017.5546%2016.3439C17.8785%2016.3439%2018.1406%2016.606%2018.1406%2016.9299V18.1018ZM20.4843%2018.1018C20.4843%2018.4256%2020.2223%2018.6877%2019.8984%2018.6877C19.5745%2018.6877%2019.3125%2018.4256%2019.3125%2018.1018V16.9299C19.3125%2016.606%2019.5745%2016.3439%2019.8984%2016.3439C20.2223%2016.3439%2020.4843%2016.606%2020.4843%2016.9299V18.1018Z'%20fill='white'%3e%3c/path%3e%3cpath%20d='M10.4453%205.21122C9.22594%205.21122%208.04379%205.4956%207.0075%206.03634L4.78219%205.24497C4.56934%205.16888%204.33074%205.22267%204.17109%205.38345C4.01145%205.54368%203.95824%205.78169%204.03434%205.99513L4.76391%208.02989C4.2632%208.79435%204%209.6372%204%2010.4847C4%2013.3926%206.89137%2015.7581%2010.4453%2015.7581C13.9125%2015.7581%2016.8906%2013.4692%2016.8906%2010.4847C16.8906%207.57669%2013.9993%205.21122%2010.4453%205.21122ZM10.4453%2013.4143C10.1217%2013.4143%209.85938%2013.152%209.85938%2012.8284C9.85938%2012.5047%2010.1217%2012.2425%2010.4453%2012.2425C10.7689%2012.2425%2011.0312%2012.5047%2011.0312%2012.8284C11.0312%2013.152%2010.7689%2013.4143%2010.4453%2013.4143ZM11.0387%2010.9681C11.0387%2011.2914%2010.7726%2011.605%2010.4493%2011.605C10.1254%2011.605%209.85934%2011.3944%209.85934%2011.0706C9.85934%2010.4795%2010.1746%2010.0326%2010.6432%209.86493C10.875%209.78138%2011.0312%209.55993%2011.0312%209.31275C11.0312%208.98946%2010.7686%208.72681%2010.4453%208.72681C10.122%208.72681%209.85934%208.98946%209.85934%209.31275C9.85934%209.63661%209.59727%209.89868%209.2734%209.89868C8.94953%209.89868%208.68746%209.63661%208.68746%209.31275C8.68746%208.34345%209.47598%207.55493%2010.4453%207.55493C11.4146%207.55493%2012.2031%208.34345%2012.2031%209.31275C12.2031%2010.0526%2011.7351%2010.7181%2011.0387%2010.9681Z'%20fill='white'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_5268_6432'%3e%3crect%20width='20'%20height='20'%20fill='white'%20transform='translate(4%204)'%3e%3c/rect%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                                            alt="Avatar"
                                                       />
                                                  </div>
                                                  <Row className="w-100 text-black d-flex">
                                                       <Col xs={8} className="text-ellipsis">
                                                            <span
                                                                 title="What are the key features of React"
                                                                 className="title"
                                                                 style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'initial' }}
                                                            >
                                                                 What is Virtual DOM in React?
                                                            </span>
                                                       </Col>
                                                       <Col xs={4}>
                                                            <div className="activity-state-label on-going">
                                                                 <span title="On-going" style={{
                                                                      color: '#0078d4',
                                                                      background: '#eff6fc'
                                                                 }}>
                                                                      On-going</span>
                                                            </div>
                                                       </Col>
                                                  </Row>
                                             </ListGroup.Item>
                                             <ListGroup.Item
                                                  as="button"
                                                  disabled
                                                  className="p-2 MuiListItem-root Mui-disabled MuiListItem-gutters MuiListItem-padding Mui-selected color-selected-content d-flex bg-light"
                                                  role="button"
                                                  aria-disabled="true"
                                             >
                                                  <div className="MuiListItemAvatar-root">
                                                       <img
                                                            src="data:image/svg+xml,%3csvg%20width='28'%20height='28'%20viewBox='0%200%2028%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0%208C0%203.58172%203.58172%200%208%200H20C24.4183%200%2028%203.58172%2028%208V20C28%2024.4183%2024.4183%2028%2020%2028H8C3.58172%2028%200%2024.4183%200%2020V8Z'%20fill='%23FD9246'%3e%3c/path%3e%3cg%20clip-path='url(%23clip0_5268_6432)'%3e%3cpath%20d='M23.2361%2019.9705C23.7368%2019.2061%2024%2018.3632%2024%2017.5158C24%2014.6848%2021.2575%2012.3746%2017.8333%2012.2539C17.0355%2014.6348%2014.659%2016.6282%2011.1702%2016.8785C11.1393%2017.0891%2011.1094%2017.3%2011.1094%2017.5159C11.1094%2020.4238%2014.0007%2022.7893%2017.5547%2022.7893C18.7729%2022.7893%2019.9557%2022.5049%2020.9925%2021.9642L23.2178%2022.7555C23.4266%2022.8301%2023.6668%2022.78%2023.8289%2022.6171C23.9886%2022.4568%2024.0418%2022.2188%2023.9657%2022.0054L23.2361%2019.9705ZM15.7968%2018.1018C15.7968%2018.4256%2015.5348%2018.6877%2015.2109%2018.6877C14.887%2018.6877%2014.625%2018.4256%2014.625%2018.1018V16.9299C14.625%2016.606%2014.887%2016.3439%2015.2109%2016.3439C15.5348%2016.3439%2015.7968%2016.606%2015.7968%2016.9299V18.1018ZM18.1406%2018.1018C18.1406%2018.4256%2017.8785%2018.6877%2017.5546%2018.6877C17.2308%2018.6877%2016.9687%2018.4256%2016.9687%2018.1018V16.9299C16.9687%2016.606%2017.2308%2016.3439%2017.5546%2016.3439C17.8785%2016.3439%2018.1406%2016.606%2018.1406%2016.9299V18.1018ZM20.4843%2018.1018C20.4843%2018.4256%2020.2223%2018.6877%2019.8984%2018.6877C19.5745%2018.6877%2019.3125%2018.4256%2019.3125%2018.1018V16.9299C19.3125%2016.606%2019.5745%2016.3439%2019.8984%2016.3439C20.2223%2016.3439%2020.4843%2016.606%2020.4843%2016.9299V18.1018Z'%20fill='white'%3e%3c/path%3e%3cpath%20d='M10.4453%205.21122C9.22594%205.21122%208.04379%205.4956%207.0075%206.03634L4.78219%205.24497C4.56934%205.16888%204.33074%205.22267%204.17109%205.38345C4.01145%205.54368%203.95824%205.78169%204.03434%205.99513L4.76391%208.02989C4.2632%208.79435%204%209.6372%204%2010.4847C4%2013.3926%206.89137%2015.7581%2010.4453%2015.7581C13.9125%2015.7581%2016.8906%2013.4692%2016.8906%2010.4847C16.8906%207.57669%2013.9993%205.21122%2010.4453%205.21122ZM10.4453%2013.4143C10.1217%2013.4143%209.85938%2013.152%209.85938%2012.8284C9.85938%2012.5047%2010.1217%2012.2425%2010.4453%2012.2425C10.7689%2012.2425%2011.0312%2012.5047%2011.0312%2012.8284C11.0312%2013.152%2010.7689%2013.4143%2010.4453%2013.4143ZM11.0387%2010.9681C11.0387%2011.2914%2010.7726%2011.605%2010.4493%2011.605C10.1254%2011.605%209.85934%2011.3944%209.85934%2011.0706C9.85934%2010.4795%2010.1746%2010.0326%2010.6432%209.86493C10.875%209.78138%2011.0312%209.55993%2011.0312%209.31275C11.0312%208.98946%2010.7686%208.72681%2010.4453%208.72681C10.122%208.72681%209.85934%208.98946%209.85934%209.31275C9.85934%209.63661%209.59727%209.89868%209.2734%209.89868C8.94953%209.89868%208.68746%209.63661%208.68746%209.31275C8.68746%208.34345%209.47598%207.55493%2010.4453%207.55493C11.4146%207.55493%2012.2031%208.34345%2012.2031%209.31275C12.2031%2010.0526%2011.7351%2010.7181%2011.0387%2010.9681Z'%20fill='white'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_5268_6432'%3e%3crect%20width='20'%20height='20'%20fill='white'%20transform='translate(4%204)'%3e%3c/rect%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                                            alt="Avatar"
                                                       />
                                                  </div>
                                                  <Row className="w-100 text-black d-flex">
                                                       <Col xs={8} className="text-ellipsis">
                                                            <span
                                                                 title="What are the key features of React"
                                                                 className="title"
                                                                 style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'initial' }}
                                                            >
                                                                 What does 'State transitions' mean
                                                            </span>
                                                       </Col>
                                                       <Col xs={4}>
                                                            <div className="activity-state-label on-going">
                                                                 <span title="On-going" style={{
                                                                      color: '#0078d4',
                                                                      background: '#eff6fc'
                                                                 }}>
                                                                      On-going</span>
                                                            </div>
                                                       </Col>
                                                  </Row>
                                             </ListGroup.Item>
                                        </div>
                                   </Col>

                              </Row>

                         </Container>
                    </div>
               </div >
          </>
     );
};

export default Activities;
