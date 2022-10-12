import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Main.css";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [users, setUsers] = useState();
  const [userId, setUserId] = useState();
  const URL_API = "http://localhost:4000";

  async function loginUser(credentials) {
    const data = {};
    await axios.get(URL_API + "/users", JSON.stringify(data)).then((result) => {
      console.log(result);
      console.log(result.data);
      setUsers(result);
    });
    /* for (let index = 0; index < users.length; index++) {
      if (users[index].username == credentials.username) {
        setUserId(users[index]._id);
        console.log(userId);
      }
    } */

    console.log(credentials);
    /* await axios.post(URL_API + "/users", credentials).then((result) => {
      console.log(result);
      console.log(result.data);
    }); */
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="LoginMargin">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
