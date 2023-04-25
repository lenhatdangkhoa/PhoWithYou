import React from "react";
import { Button } from "./Button";
import { Footer } from "./Footer";
import "./Home.css";
import { Link } from "react-router-dom";
import { CardLoop } from "./CardLoop";
import {motion} from "framer-motion"

export function Home() {
  return (
    <motion.div 
      className="Home"
      initial={{opacity: 0, width: 0}}
      animate={{opacity: 1, width: "100vw"}}
      exit={{opacity: 0, x: window.innerWidth, transition: {duration: 0.5}}}
    >
      <div className="header">
        <div className="logoName">
          <img
            src="https://cdn3.iconfinder.com/data/icons/valentine2/100/Valentine_love-11-512.png"
            alt="wine glass"
            id="app-logo"
          />
          <div className="titleName">
            <h1>PHO</h1>
            <h3>WithYou</h3>
          </div>
        </div>
        <div className="buttons">
          <Link to="/login">
            <Button buttonName="Log In" />
          </Link>
          <Link to="/signup">
            <Button buttonName="Sign Up" />
          </Link>
        </div>
      </div>
      <div className="body">
        <h1 className="statement">"The best dating app ever" - Mai Kuchi</h1>
        <h2 className="statement">Select your match and connect</h2>
        <div className="loop">
          <CardLoop className="loop"></CardLoop>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}
