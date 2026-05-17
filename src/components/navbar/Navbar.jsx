import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="top-nav">
      <a className="brand" href="#home">Mazen.</a>
      <div>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
