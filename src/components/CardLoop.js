import React, {useState, useEffect} from "react";
import {motion} from "framer-motion"
import { User } from "./User";
import "./User.css";

export function CardLoop(props) {

    var users = 
        [{
            name: "Nnamdi Obichi",
            desc: "That one guy" 
        }, {
            name: "Khoa Le",
            desc: "Funny, Smart, Cool"
        }, {
            name: "Gage Roney",
            desc: "White, Mustache, Cool" 
        }];

    const [index, setIndex] = useState(0);
    function updateCard() {
        if (index >= 2) {
            setIndex(0);
        } else {
            setIndex(prev => prev + 1);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
          updateCard();
        }, 2000);
      
        return () => clearInterval(interval);
      });

    

    return (
        <motion.div
            className="homeAnimation" 
            initial={{scale:0.5}}
            animate={{scale: [1,1.1,1]}}
            transition={{duration:4, repeat: Infinity}}>
            <User name={users[index].name} description={users[index].desc} />
        </motion.div>

    );
} 