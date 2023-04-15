import React from "react";
import { useState } from "react";
import { Button } from "./Button";
import { Link, Navigate } from "react-router-dom";
import "./EditProfile.css";
import { MainPage } from "./MainPage";

export function EditProfile(props) {
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState("");
  const [bio, setBio] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="EditProfile">
      <div className="formHeader">
        <h2>Edit Profile</h2>
      </div>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt="userImage"
      />
      <form onSubmit={handleSubmit} className="editForm">
        <label>
          Name:
          <input
            id="userName"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Personality:
          <input
            id="personality"
            type="text"
            value={personality}
            onChange={(event) => setPersonality(event.target.value)}
          />
        </label>
        <br />
        <label>
          Bio:
          <textarea
            id="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </label>
        <br />
      </form>
      <Link to="/main-page">
        <Button buttonName="Done" />
      </Link>
    </div>
  );
}
