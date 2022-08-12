import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import JoblyApi from "../api/api";
import UserContext from "../app/UserContext";

export default function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({...currentUser, password: ""});
  const [formErrors, setFormErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    let updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedProfile;

    try {
      setSuccess(false);
      setFormErrors([]);

      updatedProfile = await JoblyApi.saveProfile(username, updateData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData(data => ({ ...data, password: "" }));
    setFormErrors([]);
    setSuccess(true);
    setCurrentUser(updatedProfile);
  }

  return (
    <div className="form-div">
      <h3 className="form-title"> Profile </h3>
      <Form onSubmit={handleSubmit}>
        <Alert show={formErrors.length} variant="danger">
          <Alert.Heading> Oops! </Alert.Heading>
          <p> {formErrors} </p>
        </Alert>

        <Alert show={success} variant="success">
          <Alert.Heading> Success! </Alert.Heading>
          <p> Your profile has been updated. </p>
        </Alert>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label> Username </Form.Label>
          <p> {formData.username} </p>
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

        <Button variant="primary" type="submit" className="fluid-btn"> Save Changes </Button>
      </Form>
    </div>
  );
}
