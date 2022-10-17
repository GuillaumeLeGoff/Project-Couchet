import React, { Component } from "react";
import { Button, Col, InputGroup, Row } from "react-bootstrap";
import AuthService from "../../services/authService";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
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
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      successful: false,
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


  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.password,
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.message.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <div>
        <Form
          onSubmit={this.handleRegister}
          ref={(c) => {
            this.form = c;
          }}
          style={{ justifyContent: "center" }}
        >
          {" "}
          <div className="mb-3" controlId="formBasicEmail">
            <label>Email address</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.username}
              onChange={this.onChangeUsername}
              validations={[required]}
            />
          </div>
          <div className="mb-3" controlId="formBasicPassword">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              validations={[required]}
            />
          </div>
          <CheckButton
                            
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
        </Form>
        
      </div>
    );
  }
}
