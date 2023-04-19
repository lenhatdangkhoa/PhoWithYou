import React from "react";
import { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./SignUp.css";

export function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="sgn">
      <form className="formSignUp">
        <div className="HomeButton">
          <Link to="/">
            <Button buttonName="Back to Landing..." />
          </Link>
        </div>
        <div className="signInButton">
          <p>Already have an account?</p>
          <p>Click here to sign in</p>
          <Link to="/login">
            <Button buttonName="Sign In" />
          </Link>
        </div>
        <div className="formHeaderSignUp">
          <h1>Sign Up</h1>
        </div>
          <div>
            <label>
              <input
                type="text"
                placeholder="Enter your email..."              
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className= "emailBox"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="text"
                placeholder="Create a password..."   
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                className= "passwordBox"
              />
            </label>
          </div>

        <div className="signup">
          <Link to="/">
            <Button buttonName="Sign Up" />
          </Link>
        </div>
      </form>
    </div>
  );
}