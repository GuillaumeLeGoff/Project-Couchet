import React, { Component } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import AuthService from "../../services/authService";
import authService from "../../services/authService";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required !
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true,
    });
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          console.log("OK");
          this.props.history.push("/home");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.message.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    
  }

  render() {
    return (
      <div>
        <Form
          onSubmit={this.handleLogin}
          ref={(c) => {
            this.form = c;
          }}
          style={{ justifyContent: "center" }}
        >
          {" "}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              name="username"
              value={this.state.username}
              onChange={this.onChangeUsername}
              validations={[required]}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              validations={[required]}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Col
          className="center"
          style={{
            margin: "10px",
            maxWidth: "350px",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            className="card card-container flex-column"
            style={{
              borderRadius: "0",
              justifyContent: "center",
              textAlign: "center",
              backgroundColor: "#203038",
            }}
          >
            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
              style={{ justifyContent: "center" }}
            >
              Se connecter
              <div className="form-group" style={{ justifyContent: "center" }}>
                <Row>
                  <label htmlFor="username">Nom d'utilisateur</label>
                </Row>

                <Row
                  style={{
                    width: "inherit",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                >
                  <InputGroup
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required]}
                  />
                </Row>
              </div>
              <div className="form-group">
                <Row>
                  <label htmlFor="password">Mot de passe</label>
                </Row>
                <Row
                  style={{
                    width: "inherit",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                >
                  <InputGroup
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}
                  />
                </Row>
              </div>
              <div
                className="form-group"
                style={{ justifyContent: "center", textAlign: "center" }}
              >
                <button
                  className="btn btn-primary btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <Button
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </Col>
      </div>
    );
  }
}
