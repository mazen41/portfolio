import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import VerifiedIcon from '@mui/icons-material/Verified';
import Navbar from '../navbar/Navbar';
import { projectsData } from '../../projectsData';
import { pageVariants, easeOutExpo, useMotionTuning } from '../../motionSystem';
import { useTheme } from '../../Them';
import './projects.css';

const categoryColors = {
  'SaaS Platform': '#00bcd4',
  'E-Commerce / Salla App': '#22d47a',
  'Mobile App': '#1a6b4a',
  'Enterprise Platform': '#1a4a8a',
  'Full-Stack System': '#2d6a4f',
  'Enterprise System': '#6b2d8b',
  'Operations Platform': '#8b4513',
  'Fintech Platform': '#1a5c6b',
  'Full-Stack App': '#4a5568',
};

const ProjectCard = ({ project, index }) => (
  <motion.div
    className={`project-card ${project.featured ? 'featured-card' : ''}`}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.4, delay: index * 0.04, ease: easeOutExpo }}
  >
    <Link to={`/projects/${project.slug}`} className="project-card-link-wrapper" aria-label={`View case study for ${project.name}`}>
      <div className="image-container">
        <img src={project.image} alt={project.name} loading="lazy" />
        <div className="image-overlay" />
        {project.badge && (
          <div className="project-live-badge-clean">{project.badge}</div>
        )}
      </div>

      <div className="card-content">
        <div className="card-meta-top">
          <span
            className="category-badge"
            style={{ '--badge-color': categoryColors[project.category] || '#555' }}
          >
            {project.category}
          </span>
          {project.credibility && (
            <span className="card-credibility-pill" title={project.credibility}>
              <VerifiedIcon style={{ fontSize: 13, marginRight: 4 }} />
              {project.credibility.includes('Nahdet Misr') ? 'Nahdet Misr' : 'Enterprise'}
            </span>
          )}
        </div>

        <h3 className="card-title">{project.name}</h3>
        <p className="card-desc">{project.smallDescription}</p>

        {project.resultNumber && (
          <div className="card-metric-tag">
            <span className="metric-dot" />
            {project.resultNumber}
          </div>
        )}

        <div className="tech-pills">
          {project.stack?.slice(0, 3).map((tech) => (
            <span key={tech} className="tech-pill">{tech}</span>
          ))}
          {project.stack?.length > 3 && (
            <span className="tech-pill more">+{project.stack.length - 3}</span>
          )}
        </div>

        <div className="card-footer-cta">
          <span className="read-case-study">
            Read Case Study <ArrowForwardIcon style={{ fontSize: 14, marginLeft: 4 }} />
          </span>
        </div>
      </div>
    </Link>

    {/* Quick External Links on Card (don't block card click) */}
    <div className="card-quick-actions">
      {project.liveLink && (
        <a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="quick-action-btn"
          title="Open Live Product"
          onClick={(e) => e.stopPropagation()}
        >
          <OpenInNewIcon fontSize="small" />
        </a>
      )}
      {project.gitFrontendLink && (
        <a
          href={project.gitFrontendLink}
          target="_blank"
          rel="noopener noreferrer"
          className="quick-action-btn"
          title="View GitHub Repository"
          onClick={(e) => e.stopPropagation()}
        >
          <GitHubIcon fontSize="small" />
        </a>
      )}
    </div>
  </motion.div>
);

export default function Projects() {
  const { theme } = useTheme();
  const motionTuning = useMotionTuning();
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(projectsData.map((p) => p.category)))];
  const filtered = filter === 'All' ? projectsData : projectsData.filter((p) => p.category === filter);

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
          <span className="hero-eyebrow">Portfolio & Case Studies</span>
          <h1 className="page-title">Selected Work.</h1>
          <p className="page-subtitle">
            Every project links to a detailed case study detailing the problem, engineering role, stack, and real results.
          </p>
        </div>

        {/* Category Filters */}
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Products Banner if on All */}
        {filter === 'All' && (
          <div className="featured-section-label">
            <span>★ Featured SaaS & E-Commerce Products</span>
          </div>
        )}

        {/* Projects Grid */}
        <div className="projects-grid">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
