import React, { useState } from "react";

import { Link } from "react-router-dom";
import ContrastIcon from "@mui/icons-material/Contrast";
import './navbar.css';
import { useTheme } from '../../Them';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
const Navbar = () => {
  const location = window.location;
  const { theme, toggleTheme } = useTheme();
  const [navStatus, setNavStatus] = useState(false);
  const handleNav = () => {
    setNavStatus(true);
  }
  const handleClose = () => {
    setNavStatus(false);
  }
  return (
    <div className={`navbar ${theme}`}>
      <div className="nav">
        <ul>
          <div className="logo">
            <Link to={"/"}>
              {
                theme === "light" ? <img src="./Logo/M_N_bg.png" alt="" /> : <img src="./Logo/Logo_white.png" alt="" />
              }
            </Link>
          </div>
          <div className="links">
            {
              location.pathname !== '/about' ? (
                <Link to={"/about"}>
                  <li>About</li>
                </Link>
              ) : null
            }
            {
              location.pathname !== '/contact' ? (
                <Link to={"/contact"}>
                  <li>Contact</li>
                </Link>
              ) : null
            }
            {
              location.pathname !== '/projects' ? (
                <Link to={"/projects"}>
                  <li>Projects</li>
                </Link>
              ) : null
            }

            <span style={{ "marginTop": "7px" }} onClick={toggleTheme} className="moon">
              <ContrastIcon />
            </span>
          </div>
          <div className="lines" onClick={handleNav}>
            <span><DehazeIcon /></span>
          </div>
        </ul>
      </div>
      {
        navStatus && (
          <div className="overlay"></div>
        )
      }

      <AnimatePresence>
        {navStatus && (
          <motion.div
            className="mob-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="logo">
              <Link to={"/"} style={{ "marginTop": "30px" }}>
                {
                  theme === "light" ? <img src="./Logo/M_N_bg.png" alt="" /> : <img src="./Logo/Logo_white.png" alt="" />
                }
              </Link>
              <span style={{ "position": "relative", "top": "156px", "cursor": "pointer" }} onClick={toggleTheme}><ContrastIcon /></span>
            </div>
            <div className="navigation">
              <ul>
                <Link to={"/about"}>
                  <li className={location.pathname === "/about" ? "active" : ""}>About</li>
                </Link>
                <Link to={"/contact"}>
                  <li className={location.pathname === "/contact" ? "active" : ""}>Contact</li>
                </Link>
                <Link to={"/projects"}>
                  <li className={location.pathname === "/projects" ? "active" : ""}>Projects</li>
                </Link>
              </ul>
            </div>
            <div className="mob-lines" onClick={handleClose}>
              <span className="grid"><DehazeIcon /></span>
              <span className="close"><CloseIcon /></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
