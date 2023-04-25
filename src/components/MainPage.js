import React from "react";
import { useState, useEffect } from "react";
import { User } from "./User";
import { Link } from "react-router-dom";
import "./MainPage.css";
import { Button } from "./Button";
import {motion} from "framer-motion"

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
      <motion.div 
      className="mainPg"
      initial={{opacity: 0, width: 0}}
      animate={{opacity: 1, width: "100vw"}}
      exit={{opacity: 0, x: window.innerWidth, transition: {duration: 0.5}}}
      >
        <div className="heading">
          <img src={image} alt="user-profile" />
          <h1 className="matches">Potential Matches</h1>
        </div>
        <div className="logout">
          <Link to="/">
            <Button buttonName="Log Out"/>
          </Link>
        </div>
        <h3 className="edit" onClick={() => setEdit(true)}>Edit Profile</h3>
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
      </motion.div>
    );
  } else {
    function handleSubmit(event) {
      event.preventDefault();
    }
    return (
      <motion.div 
      className="EditProfile"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      >
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
      </motion.div>
    );
  }
}
