import React from "react";
import { useState } from "react";
import { Button } from "./Button";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";
import { MainPage } from "./MainPage";


export function EditProfile(props) {

    const [name, setName] = useState("");
    const [personality, setPersonality] = useState("");
    const [bio, setBio] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

    }

    return (
        <div className="editProfile">
            <div className="formHeader">
                <h2>Edit Profile</h2>
            </div>
            
        <form onSubmit={handleSubmit} className="editForm">
            <label>
                Name:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <br />
            <label>
                Personality:
                <input type="text" value={personality} onChange={(event) => setPersonality(event.target.value)} />
            </label>
            <br />
            <label>
                Bio:
                <textarea value={bio} onChange={(event) => setBio(event.target.value)} />
            </label>
            <br />
            </form>
            </div>
    );
}
