import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

import "./CompanyCard.css";


export default function CompanyCard({ name, description, logoUrl, handle }) {
  return (
    <Link className="CompanyCard card" to={`/companies/${handle}`}>
      <Card>
        <Card.Body>
          <Card.Img src={logoUrl || '/logos/logo2.png'} />
          <Card.Title> {name} </Card.Title>
          <Card.Text> {description} </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
