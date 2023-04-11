import React from "react";
import "./Footer.css";

export function Footer(props) {
  return (
    <footer className="Footer">
      <p>Copyright © {new Date().getFullYear()} by Khoa Le and Gage Roney</p>
    </footer>
  );
}
