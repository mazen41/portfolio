import React, { useState } from "react";
import { motion } from "framer-motion";
import { pageVariants, easeOutExpo, useMotionTuning } from '../../motionSystem';
import Navbar from "../navbar/Navbar";
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import './contact.css';
import { useTheme } from '../../Them';

const Contact = () => {
    const { theme } = useTheme();
    const motionTuning = useMotionTuning();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) return;
        setSubmitted(true);
        setTimeout(() => {
            setName(""); setEmail(""); setMessage("");
            setSubmitted(false);
        }, 4000);
    };

    return (
        <motion.div
            className={`contact ${theme}`}
            variants={pageVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: motionTuning.duration, ease: easeOutExpo }}
        >
            <div className="navbar">
                <Navbar />
            </div>

            <div className="contact-container">
                <div className="contact-header">
                    <h2 className="contact-title">Let's Work Together.</h2>
                    <p className="contact-subtitle">
                        Have a project in mind? Looking for a developer to join your team?
                        I'd love to hear from you.
                    </p>
                </div>

                <div className="contact-body">
                    <div className="contact-info">
                        <div className="info-item">
                            <EmailIcon fontSize="small" />
                            <div>
                                <span className="info-label">Email</span>
                                <a href="mailto:mazen.hossn.121@gmail.com" className="info-value">
                                    mazen.hossn.121@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="availability-badge">
                            <span className="dot" />
                            <span>Available for new projects</span>
                        </div>

                        <div className="social-section">
                            <span className="info-label">Find Me Online</span>
                            <div className="social-icons">
                                <a href="https://www.linkedin.com/in/mazen-hossny-54a8a02b7/" target="_blank" rel="noreferrer">
                                    <LinkedInIcon /> LinkedIn
                                </a>
                                <a href="https://github.com/mazen41" target="_blank" rel="noreferrer">
                                    <GitHubIcon /> GitHub
                                </a>
                                <a href="https://twitter.com/mazen_hossny" target="_blank" rel="noreferrer">
                                    <XIcon /> Twitter
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        {submitted ? (
                            <motion.div
                                className="success-state"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="success-icon">✓</div>
                                <h3>Message Sent!</h3>
                                <p>Thanks for reaching out. I'll get back to you shortly.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="field-row">
                                    <div className="field-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Your full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="field-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="field-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        rows="6"
                                        placeholder="Tell me about your project or opportunity..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="submit-btn">
                                    Send Message
                                    <EastIcon fontSize="small" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="contact-footer">
                    <Link to="/" className="back-link">
                        <EastIcon fontSize="small" style={{ transform: 'rotate(180deg)' }} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
