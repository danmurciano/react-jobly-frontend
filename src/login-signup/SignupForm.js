import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SignupForm({ signup }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  const [formErrors, setFormErrors] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      history.push("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <div className="form-div">
      <h3 className="form-title"> Sign Up </h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label> Username </Form.Label>
          <Form.Control
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Password </Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> First Name </Form.Label>
          <Form.Control
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Last Name </Form.Label>
          <Form.Control
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Email </Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="fluid-btn"> Submit </Button>
      </Form>
    </div>
  );
}
