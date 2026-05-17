import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, easeOutExpo, useMotionTuning } from '../../motionSystem';
import './about.css';
import Navbar from '../navbar/Navbar';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EastIcon from "@mui/icons-material/East";
import { Link } from 'react-router-dom';
import { useTheme } from '../../Them';

const skills = {
    'Frontend': ['React', 'Next.js', 'TypeScript', 'SCSS', 'Framer Motion', 'Tailwind CSS'],
    'Backend': ['Laravel', 'PHP', 'Node.js', 'REST APIs', 'MySQL', 'PostgreSQL'],
    'Tools': ['Git', 'Docker', 'Vercel', 'Postman', 'Figma', 'Linux'],
};

const About = () => {
    const { theme } = useTheme();
    const motionTuning = useMotionTuning();

    return (
        <motion.div
            className={`about ${theme}`}
            variants={pageVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: motionTuning.duration, ease: easeOutExpo }}
        >
            <div className="navbar">
                <Navbar />
            </div>
            <div className="about-container">
                <div className="about-header">
                    <h2 className="about-title">About Me.</h2>
                    <p className="about-intro">
                        Full-stack developer based in Egypt. I build systems that scale,
                        interfaces that delight, and code that teams are proud of.
                    </p>
                </div>

                <div className="about-grid">
                    {/* Left column */}
                    <div className="about-main">
                        <div className="bio-section">
                            <span className="section-eyebrow">Background</span>
                            <p>
                                With over 6 years in web development, I've grown from building simple websites
                                to architecting full enterprise platforms used by real businesses. My work spans
                                B2B procurement systems, HR management platforms, automotive inspection tools,
                                logistics systems, and modern e-commerce applications.
                            </p>
                            <p>
                                I specialize in React for building scalable, component-driven frontends, and
                                Laravel for robust, well-structured APIs. I believe the best software is
                                invisible — it just works, and feels effortless to the people who use it.
                            </p>
                        </div>

                        <div className="skills-section">
                            <span className="section-eyebrow">Technical Skills</span>
                            <div className="skills-grid">
                                {Object.entries(skills).map(([category, items]) => (
                                    <div key={category} className="skill-group">
                                        <h4 className="skill-category">{category}</h4>
                                        <div className="skill-tags">
                                            {items.map(skill => (
                                                <span key={skill} className="skill-tag">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="about-side">
                        <div className="side-card">
                            <span className="section-eyebrow">Currently Reading</span>
                            <ul className="reading-list">
                                <li>
                                    <strong>Atomic Habits</strong>
                                    <span>James Clear — On building systems that stick</span>
                                </li>
                                <li>
                                    <strong>Algorithms Unlocked</strong>
                                    <span>Thomas H. Cormen — The backbone of every program</span>
                                </li>
                            </ul>
                        </div>

                        <div className="side-card">
                            <span className="section-eyebrow">Music I Work To</span>
                            <ul className="reading-list">
                                <li>
                                    <strong>This Is Eminem</strong>
                                    <a href="https://open.spotify.com/playlist/37i9dQZF1DZ06evO4gTUOY?si=0f4cb18dac31404e" target="_blank" rel="noreferrer">Spotify ↗</a>
                                </li>
                                <li>
                                    <strong>Billie Eilish</strong>
                                    <a href="https://open.spotify.com/playlist/37i9dQZF1DX6cg4h2PoN9y?si=ce06ee73d4c3475a" target="_blank" rel="noreferrer">Spotify ↗</a>
                                </li>
                                <li>
                                    <strong>Marwan Moussa Mix</strong>
                                    <a href="https://open.anghami.com/yqHffYPUCHb" target="_blank" rel="noreferrer">Anghami ↗</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="about-footer">
                    <div className="footer-nav">
                        <Link to="/projects" className="continue-link">
                            <span>View My Projects</span>
                            <EastIcon fontSize="small" />
                        </Link>
                        <Link to="/contact" className="continue-link secondary">
                            <span>Get in Touch</span>
                            <EastIcon fontSize="small" />
                        </Link>
                    </div>

                    <div className="social-links">
                        <a href="https://twitter.com/mazen_hossny" target="_blank" rel="noreferrer" aria-label="Twitter">
                            <XIcon fontSize="small" />
                        </a>
                        <a href="https://www.facebook.com/mazen.hossny.7" target="_blank" rel="noreferrer" aria-label="Facebook">
                            <FacebookOutlinedIcon fontSize="small" />
                        </a>
                        <a href="https://www.linkedin.com/in/mazen-hossny-54a8a02b7/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <LinkedInIcon fontSize="small" />
                        </a>
                        <a href="https://www.instagram.com/hossny_mazen/" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <InstagramIcon fontSize="small" />
                        </a>
                        <a href="https://github.com/mazen41" target="_blank" rel="noreferrer" aria-label="GitHub">
                            <GitHubIcon fontSize="small" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
