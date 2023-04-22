import React from "react";
import { useState } from "react";
import { Button } from "./Button";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";
import { MainPage } from "./MainPage";

export function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    if (
      document.getElementById("email").value === "gmr92094@uga.edu" &&
      document.getElementById("password").value === "password123"
    ) {
      setIsLoggedIn(true);
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/main-page" />;
  } else {
    return (
      <div className="logs">
        <form onSubmit={handleLogin} className="formLogin">
          <div className="HomeButton">
            <Link to="/">
              <Button buttonName="Back to Landing..." />
            </Link>
          </div>
          <div className="signUpButton">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <Button buttonName="Sign Up" />
            </Link>
          </div>
          <div className="formHead">
            <h1>Login</h1>
          </div>
          <div>
            <label>
              <input
                type="text"
                placeholder="Enter your email..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="emailBox"
                id="email"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="text"
                placeholder="Enter your password..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="passwordBox"
                id="password"
              />
            </label>
          </div>
          <div className="signup">
            <Button buttonName="Sign In" />
          </div>
        </form>
      </div>
    );
  }
}
