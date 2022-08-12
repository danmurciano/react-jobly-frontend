import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function SearchForm({ search }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (searchTerm) {
      search(searchTerm);
    } else {
      search();
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-5 search-form">
          <Form.Control
            className="search-bar"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={handleChange}
          />
          <Button variant="primary" type="submit" className="search-btn"> Search </Button>
        </Row>
      </Form>
    </>
  );
}
