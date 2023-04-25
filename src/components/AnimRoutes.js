import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./Home";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { MainPage } from "./MainPage";  
import {AnimatePresence} from "framer-motion"

export function AnimRoutes() {

    const location = useLocation();

    return (
    <AnimatePresence>  
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/main-page" element={<MainPage />}></Route>
        </Routes>
    </AnimatePresence>
    );
}
