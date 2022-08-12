import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import JoblyApi from "./api/api";
import UserContext from "./app/UserContext";
import Loading from "./app/Loading";
import jwt from "jsonwebtoken";
import useLocalStorage from "./hooks/useLocalStorage";

export const TOKEN_STORAGE_ID = "jobly-token";


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [appliedJobs, setAppliedJobs] = useState(new Set([]));


  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setAppliedJobs(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);


  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }


  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setAppliedJobs(new Set([...appliedJobs, id]));
  }

  function hasAppliedToJob(id) {
    return appliedJobs.has(id);
  }


  if (!infoLoaded) return <Loading />;


  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, applyToJob, hasAppliedToJob }}>
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
