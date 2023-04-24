import React from "react";
import { Card } from "./Card";
import "./User.css";

export function User(props) {
  return (
    <Card>
      <img
        src={
          props.image ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        alt="user_image"
      ></img>
      <div className="nameAndDescription">
        <h1>{props.name}</h1>
        <h2>{props.description}</h2>
      </div>
      <div className="marks">
        <div className="YesMark">
          <h2>✓</h2>
        </div>
        <div className="NoMark" onClick={() => props.onDelete(props.name)}>
          <h2>✕</h2>
        </div>
      </div>
    </Card>
  );
}
