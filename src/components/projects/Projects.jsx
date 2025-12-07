import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../navbar/Navbar';
import './projects.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTheme } from '../../Them';

const projectsData = [
    {
        id: 1,
        image: './Qartaji.png',
        name: 'Qartaji – Multi-Language E-Commerce Platform',
        smallDescription: 'A scalable and feature-rich e-commerce solution.',
        description: 'A full e-commerce website supporting Arabic and French, built to handle a wide range of products with a smooth shopping experience. Includes a powerful admin dashboard, product and order management, customer accounts, and an integrated email notification system. Features an advanced AI-powered search engine, filters, discount system, responsive UI, and secure checkout workflow. Designed for scalability, fast performance, and easy daily operation.',
        liveLink: '#', // Add your live link here
        gitFrontendLink: '#', // Add your frontend GitHub link here
        gitBackendLink: '#', // Add your backend GitHub link here
        technology: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
    },
    {
        id: 2,
        image: './Mai-Salon.png',
        name: 'Mai-Salon – Complete Beauty Salon Management System',
        smallDescription: 'End-to-end salon management with a modern touch.',
        description: 'A full solution for a beauty salon including a modern landing page, online booking system, and a complete admin dashboard. The dashboard includes a POS system, client management & communication, invoice generation, permissions & roles, HR & staff performance system, reports & statistics, inventory management, an accounting center, campaigns & marketing tools, and general settings. It also features a dedicated specialist dashboard for staff to manage the entire salon workflow end-to-end with real-time insights and a clean interface.',
        liveLink: '#',
        gitFrontendLink: '#',
        technology: ['Vue.js', 'Laravel', 'PHP', 'MySQL', 'Inertia.js'],
    },
    {
        id: 3,
        image: './Taksroide.png',
        name: 'Taksroide – Advanced Company Management System',
        smallDescription: 'A comprehensive logistics and shipping management platform.',
        description: 'A full management platform designed for a logistics/shipping company. Includes all major modules found in Mai-Salon, with more detailed and industry-specific features such as shipment & delivery management, purchase and vendor system, basket/warehouse handling, HR, accounting, permissions, invoices, and reports. It also has an inventory tracking & expenses system, along with employee performance and task tracking. Built to centralize operations, improve workflow efficiency, and offer clear dashboards for all company departments.',
        liveLink: '#',
        gitFrontendLink: '#',
        technology: ['Angular', 'Spring Boot', 'Java', 'PostgreSQL', 'AWS'],
    },
    {
        id: 4,
        image: './Meedapay.png',
        name: 'Meedapay – Online Payment Gateway',
        smallDescription: 'A secure and modern bilingual payment processing platform.',
        description: 'A bilingual Arabic/English payment gateway platform for processing service-based payments. The system includes API integration with the client’s payment provider, secure checkout and payment processing, and an order & customer management dashboard. It features a clean, modern UI inspired by MyFatoorah, with support for handling service listings, client requests, and automated notifications. The content was prepared with the client, and the platform was built with a flexible structure to allow for future scaling.',
        liveLink: '#',
        gitFrontendLink: '#',
        technology: ['React', 'Node.js', 'Stripe API', 'Firebase'],
    },
    {
        id: 5,
        image: './Social_Media_App_Picture.png',
        name: 'Social Media App',
        smallDescription: 'Connect, share, Network.',
        description: 'Designed and developed a social media platform enabling user connection and content engagement. Features include user authentication, post creation (text, images), content discovery through personalized feeds, commenting and discussion functionalities, Profile settings post delete and edit',
        explanation: 'This is the frontend part only you could see the code of the backend part in github at the link below :)',
        liveLink: 'https://social-media-app-tau-jet.vercel.app/',
        gitFrontendLink: 'https://github.com/mazen41/social-media-app.git',
        gitBackendLink: 'https://github.com/mazen41/social-media-app-api.git',
        technology: ['React', 'Laravel', 'PHP', 'Mysql'],
    },
    {
        id: 6,
        image: './E-commrece_website.png',
        name: 'E-commerce Online Store',
        smallDescription: 'Sip, savor, repeat.',
        description: 'Developed an e-commerce platform for a coffee online store. The platform facilitates online ordering, secure payment processing, and customer account management for a seamless coffee-buying experience.',
        explanation: 'This is the frontend part only you could see the code of the backend part in github at the link below :)',
        liveLink: 'https://e-commerce-online-store-kohl.vercel.app/',
        gitFrontendLink: 'https://github.com/mazen41/e-commerce-online-store.git',
        gitBackendLink: 'https://github.com/mazen41/online-store-api.git',
        technology: ['React', 'Typescript'],
    },
    {
        id: 7,
        image: './Landing_Page.png',
        name: 'Animation Landing Page',
        smallDescription: 'The Animation',
        description: 'Designed and developed an interactive landing page utilizing animation to engage and inform users.',
        liveLink: 'https://animation-landing-page-theta.vercel.app',
        gitFrontendLink: 'https://github.com/mazen41/Animation-Landing-Page.git',
        technology: ['HTML', 'SCSS', 'Javascript'],
    },
    {
        id: 8,
        image: './Dashboard.png',
        name: 'Shopify Simple Dashboard',
        smallDescription: 'The Animation',
        description: 'A clean and simple dashboard for managing an online store, inspired by Shopify\'s user interface.',
        liveLink: 'https://dashboard-iota-eosin.vercel.app/',
        gitFrontendLink: 'https://github.com/mazen41/Dashboard.git',
        technology: ['React', 'SCSS'],
    },

];

const Projects = () => {
    const { theme } = useTheme();
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        document.body.style.overflow = "hidden";
    };

    const handleCloseProject = () => {
        setSelectedProject(null);
        document.body.style.overflow = "";
    };

    return (
        <motion.div className={`projects-page ${theme}`}>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="projects-container">
                <div className="title">
                    <h2>My Projects.</h2>
                </div>
                <div className="projects-grid">
                    {projectsData.map((project) => (
                        <Project key={project.id} project={project} onProjectClick={handleProjectClick} />
                    ))}
                </div>
                {selectedProject && <div className="overlay" onClick={handleCloseProject}></div>}
                <div className={`selected-project ${selectedProject ? 'active' : ''}`}>
                    {selectedProject && (
                        <>
                            <div className="back" onClick={handleCloseProject}>
                                <span><ArrowBackIosNewIcon /></span>
                                <p>Back To Projects</p>
                            </div>
                            <div className="info">
                                <div className="first">
                                    <div className="name">
                                        <h3>{selectedProject.name}</h3>
                                        <p>{selectedProject.smallDescription}</p>
                                    </div>
                                    <div className="image">
                                        <img src={selectedProject.image} alt={selectedProject.name} />
                                    </div>
                                </div>
                                <div className="second">
                                    <div className="about">
                                        <h4>About</h4>
                                        <p>{selectedProject.description}</p>
                                    </div>
                                    <div className="tech">
                                        <h4>Technologies</h4>
                                        <ul>
                                            {selectedProject.technology.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="links">
                                    {selectedProject.liveLink && (
                                        <div className="web">
                                            <h2>Website</h2>
                                            {selectedProject.explanation && <p>{selectedProject.explanation}</p>}
                                            <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer">{selectedProject.liveLink}</a>
                                        </div>
                                    )}
                                    <div className="git">
                                        <h2>Github</h2>
                                        {selectedProject.gitFrontendLink && (
                                            <div className="front">
                                                <p>Frontend</p>
                                                <a href={selectedProject.gitFrontendLink} target="_blank" rel="noopener noreferrer">{selectedProject.gitFrontendLink}</a>
                                            </div>
                                        )}
                                        {selectedProject.gitBackendLink && (
                                            <div className="backend">
                                                <p>Backend</p>
                                                <a href={selectedProject.gitBackendLink} target="_blank" rel="noopener noreferrer">{selectedProject.gitBackendLink}</a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Project = ({ project, onProjectClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="project-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onProjectClick(project)}
        >
            <div className="image-container">
                <img src={project.image} alt={project.name} />
            </div>
            <div className={`popup ${isHovered ? 'active' : ''}`}>
                <div className="name"><h4>{project.name}</h4></div>
                <div className="description"><p>{project.smallDescription}</p></div>
                <div className="technologies">
                    <ul>
                        {project.technology?.map((tech) => (
                            <li key={tech}>{tech}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Projects;  
