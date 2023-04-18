import React from "react";
import "./Footer.css";

export function Footer(props) {
  return (
    <footer className="Footer">
      <p className="copyRight">
        Copyright © {new Date().getFullYear()} by Khoa Le, Gage Roney, and
        Nnamdi Obichi
      </p>
    </footer>
  );
}
