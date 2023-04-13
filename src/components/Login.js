import React from "react";
import { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Login.css";

export function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="formLogin">
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
          <label>Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div>
          <label>Password:
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>

        <div>
        <Link to="/">
          <Button buttonName="Sign In" />
        </Link>
        </div>
      </form>
  );
}
