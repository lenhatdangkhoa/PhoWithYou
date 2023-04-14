import React from "react";
import { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Login.css";
import { MainPage } from "./MainPage";

export function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    console.log("test");
    if (
      document.getElementById("email").value === "gmr92094@uga.edu" &&
      document.getElementById("password").value === "password123"
    ) {
      setIsLoggedIn(true);
      console.log("dreamy");
    }
  }

  if (isLoggedIn) {
    return <MainPage />;
  } else {
    return (
      <div>
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
                id="email"
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
                id="password"
              />
            </label>
          </div>

          <div>
            <Button buttonName="Sign In" />
          </div>
        </form>
      </div>
    );
  }
}
