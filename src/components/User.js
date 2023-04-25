import React from "react";
import { Card } from "./Card";
import "./User.css";

export function User(props) {

  const deleteButton = () => {
    if (props.delete === true) {
      return () => props.onDelete(props.name);
    }
    return ;
  }

  return (
    <Card className="card">
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
        <div className="NoMark" onClick={deleteButton}>        
          <h2>✕</h2>
        </div>
      </div>
    </Card>
  );
}
