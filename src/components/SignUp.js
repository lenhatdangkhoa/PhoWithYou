import React from "react";
import { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./SignUp.css";
import {motion} from "framer-motion"

export function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick() {
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      if (data.msg) {
        alert(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <motion.div 
      className="sgn"
      initial={{opacity: 0, width: 0}}
      animate={{opacity: 1, width: "100vw"}}
      exit={{opacity: 0, x: window.innerWidth, transition: {duration: 0.5}}}
    >
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
              className="emailBox"
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="password"
              placeholder="Create a password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="passwordBox"
            />
          </label>
        </div>

        <div className="signup">
          <Link to="/">
            <Button buttonName="Sign Up" onClick={() => handleClick()} />
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
