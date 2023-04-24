import React from "react";
import "./Button.css";
import {motion} from "framer-motion"

export function Button(props) {
  return (
    <motion.div
      className="homeAnimation" 
      initial={{scale:1}}
      whileHover={{scale: [1,1.1,1,1.1,1,1.1]}}
      transition={{duration: 1.5}}
    >
      <button onClick={props.onClick}>{props.buttonName}</button>
    </motion.div>
  );
}
