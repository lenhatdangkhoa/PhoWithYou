import React from "react";
import "./Button.css";

export function Button(props) {
  return <button onClick={props.onClick}>{props.buttonName}</button>;
}
