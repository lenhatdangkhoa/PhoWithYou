import React from "react";
import { useState, useEffect } from "react";
import { User } from "./User";
import "./MainPage.css";
import { Button } from "./Button";

export function MainPage(props) {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(props.userId);
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState("");
  const [bio, setBio] = useState("");
  const [edit, setEdit] = useState(false);
  function handleDelete(username) {
    setUsers(users.filter((user) => user.name !== username));
  }
  useEffect(() => {
    getUserList();
  }, [edit]);
  async function getUserList() {
    try {
      const response = await fetch("/users");
      const users = await response.json();
      setUsers(users);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleClick() {
    console.log(userId);
    try {
      const response = await fetch(`/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, personality }),
      });
      if (response.ok) {
        setEdit(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const token = localStorage.getItem("token");
  if (!edit) {
    return (
      <div className="MainPage">
        <div className="heading">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="user-profile"
          />
          <h1>Potential Matches</h1>
        </div>
        <h3 onClick={() => setEdit(true)}>Edit Profile</h3>
        <div className="userList">
          {users.map((user) => (
            <User
              name={user.name}
              description={user.description}
              onDelete={() => handleDelete(user.name)}
            />
          ))}
        </div>
      </div>
    );
  } else {
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
        <Button buttonName="Done" onClick={() => handleClick()} />
      </div>
    );
  }
}
