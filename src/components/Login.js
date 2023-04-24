import React from "react";
import { useState } from "react";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { MainPage } from "./MainPage";

// khoale -> password: 123
export function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userImage, setUserImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch("/login", {
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
      setUserId(data.user.id);
      setIsAdmin(data.user.isAdmin);
      setUserImage(data.user.image);
      localStorage.setItem("token", data.token);
      if (response.ok) setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoggedIn) {
    return (
      <MainPage userId={userId} isAdmin={isAdmin} currentImage={userImage} />
    );
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
                type="password"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="passwordBox"
                id="password"
              />
            </label>
          </div>
          <div className="signin">
            <Button buttonName="Sign In" />
          </div>
        </form>
      </div>
    );
  }
}
