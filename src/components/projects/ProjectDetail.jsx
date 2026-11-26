import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VerifiedIcon from '@mui/icons-material/Verified';
import Navbar from '../navbar/Navbar';
import { getProjectBySlug, projectsData } from '../../projectsData';
import { pageVariants, easeOutExpo, fadeUp, staggerParent } from '../../motionSystem';
import { useTheme } from '../../Them';
import './projectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (project) {
      document.title = `${project.name} | Mazen Hossny — Case Study`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', project.smallDescription);
      }
    }
    return () => {
      document.title = 'Mazen Hossny — Full Stack Developer';
    };
  }, [project]);

  if (!project) {
    return (
      <div className={`project-detail-page ${theme}`}>
        <Navbar />
        <div className="case-study-shell not-found-shell">
          <h2>Project Not Found</h2>
          <p>The case study you are looking for does not exist or has been moved.</p>
          <Link to="/projects" className="btn-back">
            <ArrowBackIcon fontSize="small" /> Back to All Projects
          </Link>
        </div>
      </div>
    );
  }

  // Find next project for footer navigation
  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <motion.main
      className={`project-detail-page ${theme}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: easeOutExpo }}
    >
      <Navbar />

      <div className="case-study-shell">
        {/* Navigation Breadcrumb */}
        <div className="case-study-nav">
          <button onClick={() => navigate(-1)} className="btn-back-text">
            <ArrowBackIcon style={{ fontSize: 18 }} /> Back
          </button>
          <div className="breadcrumb-trail">
            <Link to="/projects">Work</Link>
            <span>/</span>
            <span className="current-crumb">{project.name.split('—')[0].trim()}</span>
          </div>
        </div>

        {/* Hero Header */}
        <motion.section
          className="case-study-header"
          variants={staggerParent}
          initial="hidden"
          animate="show"
        >
          <div className="badge-row">
            <span className="category-tag">{project.category}</span>
            {project.badge && (
              <span className="live-status-tag">{project.badge}</span>
            )}
          </div>

          <motion.h1 className="case-study-title" variants={fadeUp}>
            {project.name}
          </motion.h1>

          <motion.p className="case-study-summary" variants={fadeUp}>
            {project.overview}
          </motion.p>

          {/* Quick Credibility / Metric Callout */}
          {(project.credibility || project.resultNumber) && (
            <motion.div className="credibility-callout" variants={fadeUp}>
              <VerifiedIcon className="credibility-icon" />
              <div>
                <strong className="credibility-lead">Credibility Highlight: </strong>
                <span>{project.credibility || project.resultNumber}</span>
              </div>
            </motion.div>
          )}

          {/* Action CTAs */}
          <motion.div className="case-study-actions" variants={fadeUp}>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <OpenInNewIcon style={{ fontSize: 18, marginRight: 6 }} />
                {project.liveLink.includes('play.google.com') ? 'View on Google Play' : 'View Live Product'}
              </a>
            )}
            {project.gitFrontendLink && (
              <a
                href={project.gitFrontendLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <GitHubIcon style={{ fontSize: 18, marginRight: 6 }} />
                Frontend Code
              </a>
            )}
            {project.gitBackendLink && (
              <a
                href={project.gitBackendLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <GitHubIcon style={{ fontSize: 18, marginRight: 6 }} />
                Backend API
              </a>
            )}
            <Link to="/contact" className="btn-ghost">
              Hire Me For Similar Project
            </Link>
          </motion.div>
        </motion.section>

        {/* Featured Mockup / Main Screenshot */}
        <motion.div
          className="case-study-hero-image"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <img src={project.image} alt={project.name} />
          {project.badge && (
            <div className="hero-floating-badge">{project.badge}</div>
          )}
        </motion.div>

        {/* Core Case Study Grid */}
        <div className="case-study-grid">
          {/* Main Column */}
          <div className="case-study-content">
            {/* The Problem */}
            <section className="case-section">
              <h2 className="section-heading">The Problem & Context</h2>
              <p className="section-body">{project.problem}</p>
            </section>

            {/* My Role & Architecture */}
            <section className="case-section">
              <h2 className="section-heading">My Role & Engineering Scope</h2>
              <p className="section-body">{project.role}</p>
            </section>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <section className="case-section">
                <h2 className="section-heading">Key Capabilities Delivered</h2>
                <ul className="feature-checklist">
                  {project.features.map((feature, i) => (
                    <li key={i}>
                      <CheckCircleOutlineIcon className="feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Screenshots Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <section className="case-section">
                <h2 className="section-heading">Screenshots & Visuals</h2>
                <div className="case-screenshots-grid">
                  {project.screenshots.map((s, idx) => (
                    <figure key={idx} className="screenshot-figure">
                      <img src={s.src} alt={s.title || project.name} />
                      {s.title && <figcaption>{s.title}</figcaption>}
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* The Result & Impact */}
            <section className="case-section result-section">
              <h2 className="section-heading">The Result & Real-World Impact</h2>
              <div className="result-card">
                {project.resultNumber && (
                  <div className="result-stat-pill">
                    {project.resultNumber}
                  </div>
                )}
                <p className="result-narrative">{project.result}</p>
              </div>
            </section>
          </div>

          {/* Sidebar / Meta Details */}
          <aside className="case-study-sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Tech Stack</h3>
              <div className="sidebar-tags">
                {project.stack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <h3 className="sidebar-title">Project Summary</h3>
              <dl className="meta-list">
                <dt>Category</dt>
                <dd>{project.category}</dd>
                <dt>Role Scope</dt>
                <dd>Full-Stack / Architecture</dd>
                {project.resultNumber && (
                  <>
                    <dt>Key Metric</dt>
                    <dd>{project.resultNumber}</dd>
                  </>
                )}
                <dt>Availability</dt>
                <dd>Open for new projects</dd>
              </dl>
            </div>

            <div className="sidebar-card cta-card">
              <h3>Have a similar challenge?</h3>
              <p>I can help you architect, build, and deploy your product from day one.</p>
              <Link to="/contact" className="btn-primary full-width">
                Discuss Your Project
              </Link>
            </div>
          </aside>
        </div>

        {/* Next Case Study Banner */}
        <div className="next-project-banner">
          <span className="next-label">Next Case Study</span>
          <Link to={`/projects/${nextProject.slug}`} className="next-link">
            <h3>{nextProject.name} →</h3>
          </Link>
        </div>
      </div>
    </motion.main>
  );
}
