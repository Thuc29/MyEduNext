import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./login.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const [campus, setCampus] = useState("ĐÀ NẴNG");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ campus, username, password });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      navigate("/home");
    },
  });

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <div className="text-center">
            <img src="/assets/logo_fpt.png" alt="FPT Logo" className=" w-50" />
            <h4>The social constructive learning tool</h4>
            <div>
              <Button
                onClick={() => login()}
                id="loginGoogle"
                variant="outline-primary"
                className="mb-3"
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  style={{
                    display: "inline",
                    width: "20px",
                    marginRight: "10px",
                  }}
                >
                  <g>
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </g>
                </svg>
                Sign in with Google
              </Button>

              <Button
                variant="outline-primary"
                className="mb-3"
                style={{ padding: "5px 20px" }}
              >
                Sign in FeID
                <img
                  src="/assets/logo_fpt.png"
                  style={{ width: "70px", paddingLeft: "25px" }}
                ></img>
              </Button>
            </div>

            <div className="mt-2 mb-2">
              <i style={{ fontSize: "10px" }}>
                Check if the current device has
                <b style={{ color: "red" }}> VPN</b> enabled. Please turn it
                off.
              </i>
              <br />
              <i style={{ fontSize: "10px" }}>
                If a notification appears
                <b style={{ color: "red" }}>"AN ERROR HAS OCCURRED"</b> when
                login:
                <br />
                <b style={{ color: "red" }}>
                  1: Refer to the instructions in Frequently Asked Question.
                </b>
                <br />
                <b style={{ color: "red" }}>
                  2: Check your mobile phone if you can access the system?. If
                  unsuccessful, bring your device to the IT room.
                </b>
              </i>
            </div>
          </div>
          <Form onSubmit={handleSubmit} className="border p-4 rounded shadow">
            <h6 className="text-center mb-4">
              Select a campus before signing in to the system with your username
            </h6>
            <Form.Group controlId="formCampus">
              <Form.Label>Campus</Form.Label>
              <Form.Control
                as="select"
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
              >
                <option>ĐÀ NẴNG</option>
                <option>CẦN THƠ</option>
                <option>QUY NHƠN</option>
                <option>HÀ NỘI - HÒA LẠC</option>
                <option>HỒ CHÍ MINH</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
                <FormControl
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text id="basic-addon2">
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
                <FormControl
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              block
              className=" mt-3"
              style={{ width: "100%" }}
            >
              LOGIN
            </Button>
          </Form>
          <div style={{ textAlign: "center" }}>
            <i style={{ fontSize: "10px" }}>
              Khi hệ thống quá tải hãy f5 và đăng nhập lại
            </i>
          </div>

          <div className="text-center mt-3">
            <a href="/faq">FREQUENTLY ASKED QUESTION</a>
            <br />
            <p className="mt-2">
              <a href="#">IT HELP DESK - PHONE: +84 123456789</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
