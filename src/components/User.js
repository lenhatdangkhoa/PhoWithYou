import React from "react";
import { Card } from "./Card";
import "./User.css";

export function User(props) {
  return (
    <Card>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt="user_image"
      ></img>
    </Card>
  );
}
