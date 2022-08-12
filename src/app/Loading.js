import React from "react";
import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {
  return (
    <div className="Homepage">
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="secondary" />
    </div>
  );
}
