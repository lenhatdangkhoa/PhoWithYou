import React from "react";
import { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Login.css";

export function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    if (email === 'gmr92094@uga.edu' && password === 'password123') {
      setIsLoggedIn(true);
      console.log("dreamy");
    }

    if (isLoggedIn) {
      return <Link to="/main-page">
                <Button buttonName="Sign In" />
            </Link>;
    }
    else {

    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome to PhoWithYou</h1>
      ) : (
    <form onSubmit={handleLogin} className="formLogin">
      <div className="signUpButton">
        <p>Don't have an account?</p>
        <Link to="/signup">
          <Button buttonName="Sign Up" />
        </Link>
      </div>
      <div className="formHeader">
        <h1>Login</h1>
      </div>
      <div>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="emailBox"
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="passwordBox"
          />
        </label>
      </div>

      <div>
        <Link to="/signUp">
          <Button buttonName="Sign In" />
        </Link>
      </div>
    </form>
      )}
      </div>
  );
}
