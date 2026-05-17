import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../navbar/Navbar';
import './projects.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '../../Them';

const projectsData = [
    {
        id: 1,
        image: './samh.png',
        name: 'SAMH — Automotive Inspection & Sales Platform',
        category: 'Full-Stack System',
        smallDescription: 'End-to-end car selling, inspection & examination system.',
        description: 'SAMH is a comprehensive automotive management platform designed to streamline the entire vehicle lifecycle — from listing and inspection to reporting and final sale. The system provides structured workflows for vehicle listings with detailed specs, multi-step inspection flows with standardized checklists, professional PDF report generation, real-time status tracking, and a full administrative control panel. Built to serve dealerships, inspection agencies, and individual sellers with a unified, reliable experience.',
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
        description: 'Qartaji is a robust B2B procurement and e-commerce platform that bridges the gap between companies and their suppliers. The platform covers the entire procurement lifecycle — from RFQ (Request for Quotation) creation and supplier quotation management, to comparison tools, approval workflows, and order fulfillment. It supports multiple roles including buyers, suppliers, and administrators, each with tailored dashboards and permissions. The system features secure JWT authentication, real-time notifications, and audit-ready approval chains.',
        features: [
            'RFQ creation & multi-supplier quotation management',
            'Quotation comparison & smart vendor selection',
            'Multi-stage approval workflows',
            'Multi-role system: Buyers, Suppliers, Admins',
            'Real-time notifications & activity feeds',
            'Secure JWT authentication & session management',
            'Comprehensive dashboards per role',
        ],
        liveLink: 'https://qartaji.net',
        gitFrontendLink: null,
        technology: ['Next.js', 'Laravel', 'PHP', 'MySQL', 'REST API', 'JWT'],
    },
    {
        id: 3,
        image: './hr-system.png',
        name: 'HR System — Human Resources Management Platform',
        category: 'Enterprise System',
        smallDescription: 'Complete HR management covering employees, departments, roles & permissions.',
        description: 'A full-featured Human Resources Management System (HRMS) designed to centralize and automate all HR operations within an organization. The platform supports complete employee lifecycle management including onboarding, profile management, and offboarding. Administrators can manage departments, branches, and define granular role-based permission structures. The system provides full visibility into workforce data, organizational hierarchy, and administrative controls through a modern, intuitive dashboard.',
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
        description: 'Yaman is a comprehensive order and logistics management system built to handle the full operational pipeline — from customer basket creation and order placement to shipping assignment, real-time tracking, and delivery confirmation. The platform provides administrative dashboards with deep reporting capabilities, allowing operations managers to monitor order statuses, shipping performance, and fulfillment metrics. It includes role-based access for staff managing different stages of the fulfillment workflow.',
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
        description: 'MeedaPay is a production-ready bilingual (Arabic/English) payment gateway platform built for processing service-based payments. The system integrates with the client\'s existing payment provider through a clean API layer, and provides a secure checkout experience with order & customer management. Built with a scalable architecture to support future service expansions, the UI is modern, responsive, and fully RTL-compatible for Arabic markets.',
        features: [
            'Bilingual Arabic/English interface (full RTL support)',
            'Secure payment processing with provider API integration',
            'Order & customer management dashboard',
            'Service listing and request handling',
            'Automated notification system',
            'Scalable architecture for future growth',
        ],
        liveLink: '#',
        gitFrontendLink: null,
        technology: ['React', 'Node.js', 'REST API', 'MySQL'],
    },
    {
        id: 6,
        image: './Social_Media_App_Picture.png',
        name: 'Social Media Application',
        category: 'Full-Stack App',
        smallDescription: 'Connect, share, and engage on a full-featured social platform.',
        description: 'A full-stack social media platform enabling users to connect, share content, and engage with their network. The platform features user authentication and profiles, post creation with text and images, personalized feeds, commenting and discussion threads, and profile management including post editing and deletion. Built with a decoupled React frontend and a Laravel REST API backend.',
        explanation: 'This is the frontend repository. The backend API is available separately on GitHub.',
        liveLink: 'https://social-media-app-tau-jet.vercel.app/',
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
        description: 'A complete e-commerce platform developed for a specialty coffee brand, providing a smooth and enjoyable online shopping experience. The platform includes product browsing and filtering, a shopping cart system, secure payment processing, and customer account management. Designed with a clean, brand-consistent UI that enhances the premium feel of the product.',
        explanation: 'This is the frontend repository. The backend API is available separately on GitHub.',
        liveLink: 'https://e-commerce-online-store-kohl.vercel.app/',
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
        description: 'A carefully crafted animated landing page that demonstrates advanced CSS animation techniques combined with smooth scroll interactions. Built to engage visitors immediately with motion-driven storytelling, scroll-triggered reveals, and a polished visual identity.',
        liveLink: 'https://animation-landing-page-theta.vercel.app',
        gitFrontendLink: 'https://github.com/mazen41/Animation-Landing-Page.git',
        technology: ['HTML', 'SCSS', 'JavaScript'],
    },
    {
        id: 9,
        image: './Dashboard.png',
        name: 'Shopify-Style Admin Dashboard',
        category: 'Frontend',
        smallDescription: 'A clean, data-rich admin dashboard for online store management.',
        description: 'A clean and functional admin dashboard for managing an online store, designed with a Shopify-inspired interface. Includes product management tables, order tracking, sales overview charts, and a responsive layout optimized for desktop administration workflows.',
        liveLink: 'https://dashboard-iota-eosin.vercel.app/',
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

const Project = ({ project, onProjectClick, index }) => {
    return (
        <motion.div
            className="project-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
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
};

const Projects = () => {
    const { theme } = useTheme();
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('All');

    const categories = ['All', ...Array.from(new Set(projectsData.map(p => p.category)))];

    const filtered = filter === 'All'
        ? projectsData
        : projectsData.filter(p => p.category === filter);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseProject = () => {
        setSelectedProject(null);
        document.body.style.overflow = '';
    };

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') handleCloseProject();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <motion.div
            className={`projects-page ${theme}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                        <Project
                            key={project.id}
                            project={project}
                            onProjectClick={handleProjectClick}
                            index={index}
                        />
                    ))}
                </div>

                {selectedProject && (
                    <div className="overlay" onClick={handleCloseProject} />
                )}

                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            className="selected-project active"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 260 }}
                        >
                            <div className="panel-header">
                                <button className="back-btn" onClick={handleCloseProject}>
                                    <ArrowBackIosNewIcon fontSize="small" />
                                    <span>Back to Projects</span>
                                </button>
                                <span
                                    className="panel-category"
                                    style={{ '--badge-color': categoryColors[selectedProject.category] || '#555' }}
                                >
                                    {selectedProject.category}
                                </span>
                            </div>

                            <div className="panel-hero">
                                <img src={selectedProject.image} alt={selectedProject.name} />
                            </div>

                            <div className="panel-body">
                                <h2 className="panel-title">{selectedProject.name}</h2>
                                <p className="panel-tagline">{selectedProject.smallDescription}</p>

                                <div className="panel-section">
                                    <h4 className="section-label">Overview</h4>
                                    <p className="panel-description">{selectedProject.description}</p>
                                </div>

                                {selectedProject.features && (
                                    <div className="panel-section">
                                        <h4 className="section-label">Key Features</h4>
                                        <ul className="features-list">
                                            {selectedProject.features.map((f, i) => (
                                                <li key={i}>{f}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="panel-section">
                                    <h4 className="section-label">Tech Stack</h4>
                                    <div className="tech-grid">
                                        {selectedProject.technology.map((t, i) => (
                                            <span key={i} className="tech-tag">{t}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="panel-section panel-links">
                                    {selectedProject.liveLink && selectedProject.liveLink !== '#' && (
                                        <a
                                            href={selectedProject.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="link-btn primary"
                                        >
                                            <OpenInNewIcon fontSize="small" />
                                            View Live
                                        </a>
                                    )}
                                    {selectedProject.gitFrontendLink && selectedProject.gitFrontendLink !== '#' && (
                                        <a
                                            href={selectedProject.gitFrontendLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="link-btn secondary"
                                        >
                                            <GitHubIcon fontSize="small" />
                                            Frontend Repo
                                        </a>
                                    )}
                                    {selectedProject.gitBackendLink && selectedProject.gitBackendLink !== '#' && (
                                        <a
                                            href={selectedProject.gitBackendLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="link-btn secondary"
                                        >
                                            <GitHubIcon fontSize="small" />
                                            Backend Repo
                                        </a>
                                    )}
                                </div>

                                {selectedProject.explanation && (
                                    <p className="panel-note">{selectedProject.explanation}</p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Projects;
