import React from "react";
import { User } from "./User";
import "./MainPage.css";

export function MainPage(props) {
  return (
    <div className="MainPage">
      <div className="heading">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="user-profile-picture"
        />
        <h1>Potential Matches</h1>
      </div>
      <h3>Edit Profile</h3>
      <div className="userList">
        <User name="user1" description="none"></User>
        <User name="user1" description="none"></User>
        <User name="user1" description="none"></User>
        <User name="user1" description="none"></User>
        <User name="user1" description="none"></User>
      </div>
    </div>
  );
}
