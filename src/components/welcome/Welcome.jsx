import React, { useState, useEffect } from "react";
import EastIcon from "@mui/icons-material/East";
import "./welcome.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useTheme } from '../../Them';

const roles = ["Full-Stack Developer", "React Specialist", "Laravel Expert", "UI/UX Enthusiast"];

const Welcome = () => {
  const [loadingText, setLoadingText] = useState("");
  const [loading, setLoading] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const text = "Hello.";
    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(text.substring(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 700);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loading) return;
    const cycle = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex(prev => (prev + 1) % roles.length);
        setRoleVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(cycle);
  }, [loading]);

  return (
    <motion.div
      className={`welcome ${theme}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {loading && (
        <div className="loading-animation">
          <h2>{loadingText}<span className="cursor-blink">|</span></h2>
        </div>
      )}

      <div className="container" style={{ display: loading ? "none" : "" }}>
        <div className="nav">
          <Navbar />
        </div>

        <motion.div
          className="introduction"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="eyebrow">
            <span className="dot" />
            <p>Available for freelance & full-time roles</p>
          </div>

          <div className="title">
            <h1 className="name">MAZEN HOSSNY</h1>
            <div className="role-line">
              <AnimatePresence mode="wait">
                {roleVisible && (
                  <motion.span
                    key={roleIndex}
                    className="role-text"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    {roles[roleIndex]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="description">
            <p>
              I'm a <strong>full-stack developer</strong> with 6+ years of experience building
              scalable web systems, enterprise platforms, and polished digital products.
              I specialize in <strong>React</strong> and <strong>Laravel</strong>, turning complex
              requirements into clean, maintainable code and intuitive user experiences.
            </p>
            <p>
              I've shipped end-to-end solutions — from B2B procurement platforms and HR systems
              to e-commerce stores and payment gateways — working closely with clients to deliver
              work that actually moves the needle.
            </p>
          </div>

          <div className="cta-group">
            <Link to="/projects" className="cta-primary">
              View My Work
              <EastIcon fontSize="small" />
            </Link>
            <Link to="/contact" className="cta-secondary">
              Get in Touch
            </Link>
          </div>

          <div className="stats-row">
            <div className="stat">
              <span className="stat-num">6+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">20+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">10+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Welcome;
