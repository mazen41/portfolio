import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../navbar/Navbar';
import './projects.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTheme } from '../../Them';

const projectsData = [
    {
        id: 4,
        image: './MeedaPayPNG.PNG',
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
{
    id: 9,
    image: './reliant_ptaas.png',
    name: 'Reliant KSA – Penetration Testing Platform',
    smallDescription: 'A professional penetration testing as a service (PTaaS) platform.',
    description: 'Reliant KSA is a full PTaaS (Penetration Testing as a Service) platform designed for cybersecurity teams and organizations to manage security assessments efficiently. The system allows companies to register vulnerability programs, manage security findings, track remediation status, and collaborate with security researchers. It includes a modern dashboard for managing reports, severity classifications, program scopes, and activity feeds. The backend is built with Laravel providing a secure REST API, while the frontend uses Next.js for a fast and scalable interface. The platform also integrates authentication, audit logs, and structured vulnerability reporting workflows.',
    liveLink: 'https://reliant-ksa.com',
    gitFrontendLink: '#',
    gitBackendLink: '#',
    technology: ['Next.js', 'Laravel', 'PHP', 'MySQL', 'REST API'],
},
{
    id: 10,
    image: './bugbounty_platform.png',
    name: 'Bug Bounty Management System',
    smallDescription: 'Manage vulnerability reports and security programs.',
    description: 'A bug bounty style platform allowing organizations to manage vulnerability submissions from ethical hackers. The platform includes researcher profiles, program scopes, vulnerability submission workflows, severity scoring, and a triage dashboard for security teams. Built with a scalable architecture and designed to support multiple security programs simultaneously.',
    liveLink: '#',
    gitFrontendLink: '#',
    technology: ['React', 'Node.js', 'Express', 'MongoDB'],
},
{
    id: 11,
    image: './task_manager.png',
    name: 'Team Task & Project Manager',
    smallDescription: 'Organize team workflows and project tasks.',
    description: 'A collaborative task and project management application designed for teams to track work progress, assign tasks, and monitor productivity. The system includes Kanban boards, role-based permissions, project timelines, activity logs, and notifications. Designed with a responsive UI for both desktop and mobile usage.',
    liveLink: '#',
    gitFrontendLink: '#',
    technology: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
},
{
    id: 12,
    image: './analytics_dashboard.png',
    name: 'Business Analytics Dashboard',
    smallDescription: 'Real-time insights and data visualization.',
    description: 'An advanced analytics dashboard designed to help businesses visualize key metrics and performance indicators. It integrates multiple data sources and presents them through interactive charts, reports, and filtering tools. The dashboard supports role-based access and exportable reports.',
    liveLink: '#',
    gitFrontendLink: '#',
    technology: ['React', 'Chart.js', 'Node.js', 'MySQL'],
},
{
    id: 13,
    image: './ai_support_platform.png',
    name: 'AI Customer Support Platform',
    smallDescription: 'Automated customer assistance with AI.',
    description: 'A modern customer support platform integrating AI-based responses and automated ticket handling. Users can interact with the system through a chatbot interface while support teams manage escalated tickets through an admin dashboard. Designed to improve response times and streamline support operations.',
    liveLink: '#',
    gitFrontendLink: '#',
    technology: ['Next.js', 'OpenAI API', 'Node.js', 'MongoDB'],
}
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
