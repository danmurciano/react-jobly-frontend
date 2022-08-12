import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../app/UserContext";


export default function Homepage() {
  const { currentUser } = useContext(UserContext);

  return (
      <div className="Homepage">
        <h1> Jobly </h1>
        <p> All the jobs in one, convenient place. </p>

        {currentUser ? (
          <h4> {`Welcome Back, ${currentUser.firstName}`} </h4>
        ) : (
          <> </>
        )}

      </div>
  );
}
