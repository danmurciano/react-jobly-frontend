import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function LoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      history.push("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <div className="form-div">
      <h3 className="form-title"> Log In </h3>
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

        <Button variant="primary" type="submit" className="fluid-btn"> Submit </Button>
      </Form>
    </div>
  );
}
