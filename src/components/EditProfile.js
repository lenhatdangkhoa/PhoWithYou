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
      <form onSubmit={handleSubmit} className="editForm">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Personality:
          <input
            type="text"
            value={personality}
            onChange={(event) => setPersonality(event.target.value)}
          />
        </label>
        <label>
          Bio:
          <textarea
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </label>
      </form>
    </div>
  );
}
