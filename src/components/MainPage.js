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
  const [image, setImage] = useState(props.currentImage);

  const [edit, setEdit] = useState(false);
  async function handleDelete(userId) {
    if (props.isAdmin) {
      const response = await fetch(`/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        getUserList();
      }
    } else {
      alert("You are not authorized to remove users. Admin Only!");
    }
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
    try {
      const response = await fetch(`/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, personality, image }),
      });
      if (response.ok) {
        setEdit(false);
        setImage(response.user.image);
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (!edit) {
    return (
      <div className="MainPage">
        <div className="heading">
          <img src={image} alt="user-profile" />
          <h1>Potential Matches</h1>
        </div>
        <h3 onClick={() => setEdit(true)}>Edit Profile</h3>
        <div className="userList">
          {users.map((user) => (
            <User
              name={user.name}
              description={user.description}
              image={user.image}
              onDelete={() => handleDelete(user._id)}
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
        <label>
          <img src={image} alt="userImage" />
        </label>
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
            Link To Image:
            <input
              id="linkToImage"
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </label>
          <div className="doneButton">
            <Button buttonName="Done" onClick={() => handleClick()} />
          </div>
        </form>
      </div>
    );
  }
}
