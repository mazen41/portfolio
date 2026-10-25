import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants, easeOutExpo, useMotionTuning } from '../../motionSystem';
import Navbar from '../navbar/Navbar';
import './projects.css';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTheme } from '../../Them';

const projectsData = [
    {
        id: 1,
        image: './etkalm-arabi.webp',
        name: 'Etkalem Arabi — Arabic Language Learning App',
        category: 'Mobile App',
        smallDescription: 'AI-powered Arabic learning app for Egyptian expat children, built for Nahdet Misr & Ministry of Immigration.',
        description: 'Built for Nahdet Misr Publishing Group in partnership with Egypt\'s Ministry of Immigration and Expatriates Affairs, Etkalem Arabi is a production Flutter app designed to teach Arabic to Egyptian children living abroad. The app blends AI-powered activities, animated stories, and songs to build reading, writing, listening, and speaking skills — deployed on both Google Play and the App Store with 50,000+ downloads.',
        features: [
            'Interactive letter, word & sentence learning across 3 progressive stages',
            '500+ commonly used Arabic words with correct native pronunciation',
            'Animated stories & educational songs with interactive worksheets',
            'AI-powered engagement system with rewards and progress tracking',
            'Multi-child profile support with individual learning paths',
            'Fully Arabic RTL interface with printable learning materials',
            'Developed with Flutter + Firebase — deployed on Android & iOS',
        ],
        liveLink: 'https://play.google.com/store/apps/details?id=com.nahdetmisr.flutter_ems',
        gitFrontendLink: null,
        technology: ['Flutter', 'Dart', 'Firebase', 'AI/ML', 'REST API'],
        badge: 'Live on Play Store · 50K+ Downloads',
    },
    {
        id: 2,
        image: './nilelangu.webp',
        name: 'NileLangu — Egyptian Languages Learning App',
        category: 'Mobile App',
        smallDescription: 'The only app teaching Egyptian Arabic, Bohairic Coptic, and Middle Egyptian Hieroglyphics in one place.',
        description: 'NileLangu is a unique Flutter educational app covering all three Egyptian languages — modern Egyptian Arabic for daily communication, Bohairic Coptic for historical and religious study, and Middle Egyptian Hieroglyphics for cultural exploration. With 58 structured lessons, 700+ recorded words, gamified exercises, and a one-time payment model (no subscriptions), it serves language learners, researchers, and Egyptian culture enthusiasts worldwide. Live on Google Play with a 4.3★ rating.',
        features: [
            '29 Egyptian Arabic lessons with dialogues & 700+ recorded vocabulary',
            '18 Bohairic Coptic lessons with essential vocabulary & dialogues',
            '11 Middle Egyptian Hieroglyphics lessons',
            'Gamified learning with quizzes, progress tracking & rewards',
            'One-time purchase per language — no subscription model',
            'Zero third-party data sharing — privacy-first architecture',
            'Developed in Flutter — live on Android & iOS',
        ],
        liveLink: 'https://play.google.com/store/apps/details?id=com.elkammah.nilelangu',
        gitFrontendLink: null,
        technology: ['Flutter', 'Dart', 'Firebase', 'In-App Purchases'],
        badge: 'Live on Play Store · 4.3★ Rating',
    },
    {
        id: 3,
        image: './dalala.webp',
        name: 'Dalala — Saudi Classifieds & Marketplace App',
        category: 'Mobile App',
        smallDescription: 'Smart buy & sell classifieds app for the Saudi Arabian market with real-time chat and location browsing.',
        description: 'Dalala is a production Flutter classifieds platform built for the Saudi market, enabling users to browse, buy, and sell across all categories from anywhere in the Kingdom. The app features geolocation-based listing discovery, direct in-app seller chat, a streamlined Arabic posting flow, and end-to-end encrypted data handling. Published on Google Play and the App Store by ESTABLISHMENT DALAL AAB, Jizan, Saudi Arabia.',
        features: [
            'Geolocation-based ad browsing by city and category across Saudi Arabia',
            'Real-time in-app chat between buyers and sellers',
            'Simple Arabic ad creation flow in a few steps',
            'End-to-end encrypted data with secure user experience',
            'Fully Arabic RTL interface optimized for the Saudi market',
            'Clean category and search filtering system',
            'Deployed on Android & iOS — live in Saudi Arabia',
        ],
        liveLink: 'https://play.google.com/store/apps/details?id=com.dalala.customer',
        gitFrontendLink: null,
        technology: ['Flutter', 'Dart', 'Laravel', 'MySQL', 'REST API'],
        badge: 'Live · Saudi Arabia Market',
    },
    {
        id: 4,
        image: './reliant.png',
        name: 'Reliant — Security Operations Platform',
        category: 'Enterprise Platform',
        smallDescription: 'Saudi enterprise platform for managing bug-bounty programs, penetration testing, and vulnerability operations.',
        description: 'Reliant (reliant.sa) is a full-featured Security Operations Platform built for Saudi enterprise clients. It centralizes the management of bug bounty programs, penetration testing engagements, vulnerability disclosure workflows, and security researcher coordination — all within a single operations hub. Built to align with Saudi NCA and cybersecurity compliance requirements, the platform is used by enterprise security teams to run structured, auditable security programs at scale.',
        features: [
            'Bug bounty program creation, management & researcher payout flows',
            'Penetration testing engagement tracking & scoped program management',
            'Vulnerability disclosure workflow with severity classification',
            'Security researcher portal with submission & review pipelines',
            'Enterprise-grade role-based access control',
            'Compliance-ready audit trails aligned with Saudi NCA standards',
            'Full admin operations dashboard with reporting & analytics',
        ],
        liveLink: 'https://reliant.sa',
        gitFrontendLink: null,
        technology: ['Next.js', 'Laravel', 'PHP', 'MySQL', 'REST API'],
        badge: 'Live · reliant.sa',
    },
    {
        id: 5,
        image: './samh.png',
        name: 'SAMH — Automotive Inspection & Sales Platform',
        category: 'Full-Stack System',
        smallDescription: 'End-to-end vehicle inspection, reporting & sales management system.',
        description: 'SAMH is a comprehensive automotive management platform designed to streamline the entire vehicle lifecycle — from listing and inspection to PDF report generation and final sale. The system provides structured workflows for multi-step inspections, standardized checklists, real-time status tracking, and a full administrative control panel with role-based access for inspectors and managers.',
        features: [
            'Vehicle listing & inventory management',
            'Multi-step inspection workflows & standardized checklists',
            'Automated professional PDF inspection report generation',
            'Real-time vehicle status tracking dashboard',
            'Role-based access for inspectors, managers & admins',
            'Full admin control panel with audit logs',
        ],
        liveLink: null,
        gitFrontendLink: null,
        technology: ['React', 'Laravel', 'PHP', 'MySQL', 'REST API'],
    },
    {
        id: 6,
        image: './qartaji.png',
        name: 'Qartaji — B2B Procurement & E-Commerce Platform',
        category: 'Enterprise Platform',
        smallDescription: 'Full B2B procurement platform connecting businesses with suppliers through RFQ and multi-stage approval flows.',
        description: 'Qartaji is a robust B2B procurement platform bridging companies and suppliers. It covers the full procurement lifecycle — RFQ creation, supplier quotation management, comparison tools, multi-stage approval workflows, and order fulfillment — with dedicated dashboards per role.',
        features: [
            'RFQ creation & multi-supplier quotation management',
            'Quotation comparison & smart vendor selection tools',
            'Multi-stage approval workflows',
            'Multi-role system: Buyers, Suppliers, Admins',
            'Real-time notifications & activity feeds',
            'Secure JWT authentication & comprehensive dashboards',
        ],
        liveLink: null,
        gitFrontendLink: null,
        technology: ['Next.js', 'Laravel', 'PHP', 'MySQL', 'REST API', 'JWT'],
    },
    {
        id: 7,
        image: './hr-system.png',
        name: 'HR System — Human Resources Management Platform',
        category: 'Enterprise System',
        smallDescription: 'Complete HRMS covering employee lifecycle, departments, branches & granular role-based permissions.',
        description: 'A full-featured HRMS designed to centralize and automate all HR operations. Supports complete employee lifecycle management including onboarding, profile management, and offboarding. Administrators can manage departments, branches, and define granular role-based permission structures with organizational hierarchy visualization.',
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
        id: 8,
        image: './yaman.png',
        name: 'Yaman — Orders, Shipping & Tracking Management',
        category: 'Operations Platform',
        smallDescription: 'Full order and logistics management — from basket creation to delivery confirmation and reporting.',
        description: 'Yaman is a comprehensive order and logistics management system built to handle the full operational pipeline — basket creation, order placement, shipping assignment, real-time tracking, and delivery confirmation — with performance analytics and fulfillment metrics.',
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
        id: 9,
        image: './MeedaPayPNG.PNG',
        name: 'MeedaPay — Bilingual Payment Gateway',
        category: 'Fintech Platform',
        smallDescription: 'Production-ready Arabic/English payment processing platform with full RTL support.',
        description: "MeedaPay is a production-ready bilingual (Arabic/English) payment gateway platform. Integrates with the client's existing payment provider through a clean API layer, providing a secure checkout experience. Fully RTL-compatible for Arabic markets with automated notifications and scalable architecture.",
        features: [
            'Bilingual Arabic/English interface with full RTL support',
            'Secure payment processing with provider API integration',
            'Order & customer management dashboard',
            'Service listing and request handling',
            'Automated notification system',
        ],
        liveLink: null,
        gitFrontendLink: null,
        technology: ['React', 'Node.js', 'REST API', 'MySQL'],
    },
    {
        id: 10,
        image: './Social_Media_App_Picture.png',
        name: 'Social Media Application',
        category: 'Full-Stack App',
        smallDescription: 'Full-stack social platform with authentication, feeds, posts, comments & profile management.',
        description: 'A full-stack social media platform with user authentication, post creation with text and images, personalized feeds, commenting threads, and profile management.',
        liveLink: null,
        gitFrontendLink: 'https://github.com/mazen41/social-media-app.git',
        gitBackendLink: 'https://github.com/mazen41/social-media-app-api.git',
        technology: ['React', 'Laravel', 'PHP', 'MySQL'],
        explanation: 'Frontend repository — backend API available separately on GitHub.',
    },
];

const categoryColors = {
    'Mobile App': '#1a6b4a',
    'Enterprise Platform': '#1a4a8a',
    'Full-Stack System': '#2d6a4f',
    'Enterprise System': '#6b2d8b',
    'Operations Platform': '#8b4513',
    'Fintech Platform': '#1a5c6b',
    'Full-Stack App': '#4a5568',
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
            {project.badge && (
                <div className="project-live-badge">{project.badge}</div>
            )}
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
    const [scrollY, setScrollY] = useState(0);

    const categories = ['All', ...Array.from(new Set(projectsData.map(p => p.category)))];
    const filtered = filter === 'All' ? projectsData : projectsData.filter(p => p.category === filter);

    const handleProjectClick = useCallback((project) => {
        const currentScrollY = window.scrollY || window.pageYOffset || 0;
        setScrollY(currentScrollY);
        document.body.style.position = 'fixed';
        document.body.style.top = `-${currentScrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        setSelectedProject(project);
    }, []);

    const handleClose = useCallback(() => {
        setSelectedProject(null);
        const savedScrollY = Math.abs(parseInt(document.body.style.top || '0', 10)) || scrollY;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, savedScrollY);
    }, [scrollY]);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
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
            <div className="navbar"><Navbar /></div>

            <div className="projects-container">
                <div className="page-header">
                    <h2 className="page-title">Selected Work.</h2>
                    <p className="page-subtitle">
                        A curated collection of mobile apps, enterprise platforms, and systems built for real businesses and shipped to real users.
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
                            <div className="modal-backdrop" onClick={handleClose} />
                            <motion.div
                                className="modal-panel"
                                key="modal-panel"
                                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                                transition={{ duration: 0.3, ease: easeOutExpo }}
                                onClick={(e) => e.stopPropagation()}
                                role="dialog"
                                aria-modal="true"
                            >
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

                                <div className="modal-hero">
                                    <img src={p.image} alt={p.name} />
                                    <div className="modal-hero-fade" />
                                    {p.badge && <div className="modal-live-badge">{p.badge}</div>}
                                </div>

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
                                                    <li key={i}><span className="feature-dot" />{f}</li>
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

                                    <div className="modal-section modal-links">
                                        {p.liveLink && (
                                            <a
                                                href={p.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="modal-link-btn modal-link-primary"
                                            >
                                                <OpenInNewIcon fontSize="small" />
                                                View Live
                                            </a>
                                        )}
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
