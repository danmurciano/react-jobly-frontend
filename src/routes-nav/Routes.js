import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import LoginForm from "../login-signup/LoginForm";
import SignupForm from "../login-signup/SignupForm";
import ProfileForm from "../profiles/ProfileForm";
import ProtectedRoute from "./ProtectedRoute";


export default function Routes({ login, signup }) {
  return (
      <div className="pt-5">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>

          <ProtectedRoute exact path="/companies">
            <CompanyList />
          </ProtectedRoute>

          <ProtectedRoute exact path="/companies/:handle">
            <CompanyDetail />
          </ProtectedRoute>

          <ProtectedRoute exact path="/jobs">
            <JobList />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile">
            <ProfileForm />
          </ProtectedRoute>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}
