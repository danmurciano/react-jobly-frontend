import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import UserContext from "../app/UserContext";


export default function JobCard({ id, title, salary, equity, companyHandle }) {
  const { applyToJob, hasAppliedToJob } = useContext(UserContext);

  return (
    <div className="CompanyCard card">
      <Card>
        <Card.Body>
          <Card.Title> {title} </Card.Title>
          <Card.Subtitle className="mb-3 text-muted"> {companyHandle || ""} </Card.Subtitle>
          <Card.Text className="mb-1"> {`Salary: ${salary}`} </Card.Text>
          <Card.Text className="mb-1"> {`Equity: ${equity}`} </Card.Text>
          {hasAppliedToJob(id) ? (
            <Badge className="right-btn"> &#10003; Applied </Badge>
          ) : (
            <Button variant="primary" className="right-btn" onClick={() => applyToJob(id)}> Apply </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
