import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants, easeOutExpo, useMotionTuning } from '../../motionSystem';
import Navbar from '../navbar/Navbar';
import './projects.css';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '../../Them';

const projectsData = [
    {
        id: 1,
        image: './samh.png',
        name: 'SAMH — Automotive Inspection & Sales Platform',
        category: 'Full-Stack System',
        smallDescription: 'End-to-end car selling, inspection & examination system.',
        description: 'SAMH is a comprehensive automotive management platform designed to streamline the entire vehicle lifecycle — from listing and inspection to reporting and final sale. The system provides structured workflows for vehicle listings with detailed specs, multi-step inspection flows with standardized checklists, professional PDF report generation, real-time status tracking, and a full administrative control panel.',
        features: [
            'Vehicle listing & inventory management',
            'Multi-step inspection workflows & checklists',
            'Automated inspection report generation (PDF)',
            'Real-time vehicle status tracking',
            'Admin dashboard with full control panel',
            'Role-based access for inspectors & managers',
        ],
        liveLink: null,
        gitFrontendLink: null,
        technology: ['React', 'Laravel', 'PHP', 'MySQL', 'REST API'],
    },
    {
        id: 2,
        image: './qartaji.png',
        name: 'Qartaji — B2B Procurement & E-Commerce Platform',
        category: 'Enterprise Platform',
        smallDescription: 'Full-featured B2B procurement platform connecting businesses with suppliers.',
        description: 'Qartaji is a robust B2B procurement and e-commerce platform that bridges the gap between companies and their suppliers. The platform covers the entire procurement lifecycle — from RFQ creation and supplier quotation management, to comparison tools, approval workflows, and order fulfillment.',
        features: [
            'RFQ creation & multi-supplier quotation management',
            'Quotation comparison & smart vendor selection',
            'Multi-stage approval workflows',
            'Multi-role system: Buyers, Suppliers, Admins',
            'Real-time notifications & activity feeds',
            'Secure JWT authentication & session management',
            'Comprehensive dashboards per role',
        ],
        liveLink: null,
        gitFrontendLink: null,
        technology: ['Next.js', 'Laravel', 'PHP', 'MySQL', 'REST API', 'JWT'],
    },
    {
        id: 3,
        image: './hr-system.png',
        name: 'HR System — Human Resources Management Platform',
        category: 'Enterprise System',
        smallDescription: 'Complete HR management covering employees, departments, roles & permissions.',
        description: 'A full-featured HRMS designed to centralize and automate all HR operations. Supports complete employee lifecycle management including onboarding, profile management, and offboarding. Administrators can manage departments, branches, and define granular role-based permission structures.',
        features: [
            'Employee lifecycle management (onboarding to offboarding)',
            'Department & branch structure management',
            'Role-based access control with granular permissions',
            'Organizational hierarchy visualization',
            'Admin control panel with audit logs',
            'Reporting & workforce analytics',
        ],
        liveLink: null,
        gitFrontendLink: null,
        technology: ['React', 'Laravel', 'PHP', 'MySQL', 'REST API'],
    },
    {
        id: 4,
        image: './yaman.png',
        name: 'Yaman — Orders, Shipping & Tracking Management',
        category: 'Operations Platform',
        smallDescription: 'Full orders, baskets, shipping, and tracking management with reporting.',
        description: 'Yaman is a comprehensive order and logistics management system built to handle the full operational pipeline — from basket creation and order placement to shipping assignment, real-time tracking, and delivery confirmation.',
        features: [
            'Basket & order creation workflows',
            'Shipping assignment & carrier management',
            'Real-time order tracking & status updates',
            'Delivery confirmation & proof of delivery',
            'Administrative dashboard with reporting',
            'Performance analytics & fulfillment metrics',
        ],
        liveLink: null,
        gitFrontendLink: null,
        technology: ['React', 'Laravel', 'PHP', 'MySQL', 'REST API'],
    },
    {
        id: 5,
        image: './MeedaPayPNG.PNG',
        name: 'MeedaPay — Bilingual Payment Gateway',
        category: 'Fintech Platform',
        smallDescription: 'A secure, modern bilingual payment processing platform.',
        description: "MeedaPay is a production-ready bilingual (Arabic/English) payment gateway platform. Integrates with the client's existing payment provider through a clean API layer, providing a secure checkout experience. Fully RTL-compatible for Arabic markets.",
        features: [
            'Bilingual Arabic/English interface (full RTL support)',
            'Secure payment processing with provider API integration',
            'Order & customer management dashboard',
            'Service listing and request handling',
            'Automated notification system',
            'Scalable architecture for future growth',
        ],
        liveLink: null,
        gitFrontendLink: null,
        technology: ['React', 'Node.js', 'REST API', 'MySQL'],
    },
    {
        id: 6,
        image: './Social_Media_App_Picture.png',
        name: 'Social Media Application',
        category: 'Full-Stack App',
        smallDescription: 'Connect, share, and engage on a full-featured social platform.',
        description: 'A full-stack social media platform with user authentication, post creation with text and images, personalized feeds, commenting threads, and profile management.',
        explanation: 'Frontend repository — the backend API is available separately on GitHub.',
        liveLink: null,
        gitFrontendLink: 'https://github.com/mazen41/social-media-app.git',
        gitBackendLink: 'https://github.com/mazen41/social-media-app-api.git',
        technology: ['React', 'Laravel', 'PHP', 'MySQL'],
    },
    {
        id: 7,
        image: './E-commrece_website.png',
        name: 'E-Commerce Coffee Store',
        category: 'E-Commerce',
        smallDescription: 'A full-featured online store for a specialty coffee brand.',
        description: 'A complete e-commerce platform for a specialty coffee brand with product browsing, a shopping cart, secure payment processing, and customer account management.',
        explanation: 'Frontend repository — the backend API is available separately on GitHub.',
        liveLink: null,
        gitFrontendLink: 'https://github.com/mazen41/e-commerce-online-store.git',
        gitBackendLink: 'https://github.com/mazen41/online-store-api.git',
        technology: ['React', 'TypeScript', 'Laravel', 'MySQL'],
    },
    {
        id: 8,
        image: './Landing_Page.png',
        name: 'Animated Landing Page',
        category: 'Frontend',
        smallDescription: 'A visually engaging animated landing page experience.',
        description: 'A carefully crafted animated landing page demonstrating advanced CSS animation techniques with smooth scroll interactions and motion-driven storytelling.',
        liveLink: null,
        gitFrontendLink: 'https://github.com/mazen41/Animation-Landing-Page.git',
        technology: ['HTML', 'SCSS', 'JavaScript'],
    },
    {
        id: 9,
        image: './Dashboard.png',
        name: 'Shopify-Style Admin Dashboard',
        category: 'Frontend',
        smallDescription: 'A clean, data-rich admin dashboard for online store management.',
        description: 'A clean admin dashboard for managing an online store with product management tables, order tracking, sales overview charts, and a responsive layout.',
        liveLink: null,
        gitFrontendLink: 'https://github.com/mazen41/Dashboard.git',
        technology: ['React', 'SCSS'],
    },
];

const categoryColors = {
    'Full-Stack System': '#2d6a4f',
    'Enterprise Platform': '#1a4a8a',
    'Enterprise System': '#6b2d8b',
    'Operations Platform': '#8b4513',
    'Fintech Platform': '#1a5c6b',
    'Full-Stack App': '#4a5568',
    'E-Commerce': '#b7410e',
    'Frontend': '#2c5f2e',
};

const ProjectCard = ({ project, onProjectClick, index, motionTuning }) => (
    <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={motionTuning.cardHover}
        transition={{ duration: 0.55, delay: index * 0.06, ease: easeOutExpo }}
        onClick={() => onProjectClick(project)}
    >
        <div className="image-container">
            <img src={project.image} alt={project.name} />
            <div className="image-overlay" />
        </div>
        <div className="card-content">
            <span
                className="category-badge"
                style={{ '--badge-color': categoryColors[project.category] || '#555' }}
            >
                {project.category}
            </span>
            <h4 className="card-title">{project.name}</h4>
            <p className="card-desc">{project.smallDescription}</p>
            <div className="tech-pills">
                {project.technology?.slice(0, 3).map((tech) => (
                    <span key={tech} className="tech-pill">{tech}</span>
                ))}
                {project.technology?.length > 3 && (
                    <span className="tech-pill more">+{project.technology.length - 3}</span>
                )}
            </div>
        </div>
    </motion.div>
);

const Projects = () => {
    const { theme } = useTheme();
    const [selectedProject, setSelectedProject] = useState(null);
    const motionTuning = useMotionTuning();
    const [filter, setFilter] = useState('All');

    const categories = ['All', ...Array.from(new Set(projectsData.map(p => p.category)))];
    const filtered = filter === 'All' ? projectsData : projectsData.filter(p => p.category === filter);

    const handleProjectClick = useCallback((project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    }, []);

    const handleClose = useCallback(() => {
        setSelectedProject(null);
        document.body.style.overflow = '';
    }, []);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [handleClose]);

    const p = selectedProject;

    return (
        <motion.div
            className={`projects-page ${theme}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: motionTuning.duration, ease: easeOutExpo }}
        >
            <div className="navbar">
                <Navbar />
            </div>

            <div className="projects-container">
                <div className="page-header">
                    <h2 className="page-title">Selected Work.</h2>
                    <p className="page-subtitle">
                        A curated collection of systems, platforms, and applications built for real businesses.
                    </p>
                </div>

                <div className="filter-bar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filtered.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onProjectClick={handleProjectClick}
                            index={index}
                            motionTuning={motionTuning}
                        />
                    ))}
                </div>
            </div>

            {/* ── Modal ── rendered via portal to avoid transformed-parent offset issues */}
            {createPortal(
                <AnimatePresence>
                    {p && (
                        <motion.div
                            className="modal-wrapper"
                            key="modal-wrapper"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22 }}
                        >
                            {/* Backdrop — click to close */}
                            <div className="modal-backdrop" onClick={handleClose} />

                            {/* Panel — centered */}
                            <motion.div
                                className="modal-panel"
                                key="modal-panel"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 40, opacity: 0 }}
                                transition={{ duration: 0.3, ease: easeOutExpo }}
                                onClick={(e) => e.stopPropagation()}
                                role="dialog"
                                aria-modal="true"
                            >
                            {/* Sticky header */}
                            <div className="modal-header">
                                <span
                                    className="modal-category"
                                    style={{ '--badge-color': categoryColors[p.category] || '#555' }}
                                >
                                    {p.category}
                                </span>
                                <button className="modal-close" onClick={handleClose} aria-label="Close">
                                    <CloseIcon fontSize="small" />
                                </button>
                            </div>

                            {/* Hero */}
                            <div className="modal-hero">
                                <img src={p.image} alt={p.name} />
                                <div className="modal-hero-fade" />
                            </div>

                            {/* Body */}
                            <div className="modal-body">
                                <h2 className="modal-title">{p.name}</h2>
                                <p className="modal-tagline">{p.smallDescription}</p>

                                <div className="modal-divider" />

                                <div className="modal-section">
                                    <h4 className="modal-section-label">Overview</h4>
                                    <p className="modal-text">{p.description}</p>
                                </div>

                                {p.features && (
                                    <div className="modal-section">
                                        <h4 className="modal-section-label">Key Features</h4>
                                        <ul className="modal-features">
                                            {p.features.map((f, i) => (
                                                <li key={i}>
                                                    <span className="feature-dot" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="modal-section">
                                    <h4 className="modal-section-label">Tech Stack</h4>
                                    <div className="modal-tech-grid">
                                        {p.technology.map((t, i) => (
                                            <span key={i} className="modal-tech-tag">{t}</span>
                                        ))}
                                    </div>
                                </div>

                                {(p.gitFrontendLink || p.gitBackendLink) && (
                                    <div className="modal-section modal-links">
                                        {p.gitFrontendLink && (
                                            <a
                                                href={p.gitFrontendLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="modal-link-btn"
                                            >
                                                <GitHubIcon fontSize="small" />
                                                Frontend Repo
                                            </a>
                                        )}
                                        {p.gitBackendLink && (
                                            <a
                                                href={p.gitBackendLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="modal-link-btn"
                                            >
                                                <GitHubIcon fontSize="small" />
                                                Backend Repo
                                            </a>
                                        )}
                                    </div>
                                )}

                                {p.explanation && (
                                    <p className="modal-note">{p.explanation}</p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </motion.div>
    );
};

export default Projects;
