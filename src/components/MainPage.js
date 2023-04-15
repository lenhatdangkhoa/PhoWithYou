import React from "react";
import { useState } from "react";
import { User } from "./User";
import { Link } from "react-router-dom";
import "./MainPage.css";

export function MainPage(props) {
  const [users, setUsers] = useState([
    { name: "user1", description: "none" },
    { name: "user2", description: "none" },
    { name: "user3", description: "none" },
    { name: "user4", description: "none" },
    { name: "user5", description: "none" },
  ]);
  function handleDelete(username) {
    setUsers(users.filter((user) => user.name !== username));
  }
  return (
    <div className="MainPage">
      <div className="heading">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="user-profile-picture"
        />
        <h1>Potential Matches</h1>
      </div>
      <Link to="/edit-profile">
        <h3>Edit Profile</h3>
      </Link>
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
}
