import useSeo from '../../useSeo';
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
import { useLanguage } from '../../i18n/LanguageContext';
import './projectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useSeo({
    title: project ? project.name + ' | Mazen Hossny, Case Study' : 'Case Study | Mazen Hossny',
    description: project ? project.smallDescription : 'Case study by Mazen Hossny, full-stack developer.',
    path: '/projects/' + slug,
  });

  if (!project) {
    return (
      <div className={`project-detail-page ${theme}`}>
        <Navbar />
        <div className="case-study-shell not-found-shell">
          <h2>{t('pdNotFoundTitle')}</h2>
          <p>{t('pdNotFoundBody')}</p>
          <Link to="/projects" className="btn-back">
            <ArrowBackIcon fontSize="small" /> {t('pdBackAll')}
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
            <ArrowBackIcon style={{ fontSize: 18 }} /> {t('pdBack')}
          </button>
          <div className="breadcrumb-trail">
            <Link to="/projects">{t('pdWorkCrumb')}</Link>
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

          <motion.h1 className="case-study-title" variants={fadeUp} dir="ltr">
            {project.name}
          </motion.h1>

          <motion.p className="case-study-summary" variants={fadeUp} dir="ltr">
            {project.overview}
          </motion.p>

          {/* Quick Credibility / Metric Callout */}
          {(project.credibility || project.resultNumber) && (
            <motion.div className="credibility-callout" variants={fadeUp}>
              <VerifiedIcon className="credibility-icon" />
              <div>
                <strong className="credibility-lead">{t('pdCredHighlight')} </strong>
                <span dir="ltr">{project.credibility || project.resultNumber}</span>
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
                <OpenInNewIcon style={{ fontSize: 18, marginInlineEnd: 6 }} />
                {project.liveLink.includes('play.google.com') ? t('pdViewPlay') : t('pdViewLive')}
              </a>
            )}
            {project.gitFrontendLink && (
              <a
                href={project.gitFrontendLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <GitHubIcon style={{ fontSize: 18, marginInlineEnd: 6 }} />
                {t('pdFrontendCode')}
              </a>
            )}
            {project.gitBackendLink && (
              <a
                href={project.gitBackendLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <GitHubIcon style={{ fontSize: 18, marginInlineEnd: 6 }} />
                {t('pdBackendApi')}
              </a>
            )}
            <Link to="/contact" className="btn-ghost">
              {t('pdHireSimilar')}
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
              <h2 className="section-heading">{t('pdProblemHeading')}</h2>
              <p className="section-body" dir="ltr">{project.problem}</p>
            </section>

            {/* My Role & Architecture */}
            <section className="case-section">
              <h2 className="section-heading">{t('pdRoleHeading')}</h2>
              <p className="section-body" dir="ltr">{project.role}</p>
            </section>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <section className="case-section">
                <h2 className="section-heading">{t('pdFeaturesHeading')}</h2>
                <ul className="feature-checklist" dir="ltr">
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
                <h2 className="section-heading">{t('pdScreenshotsHeading')}</h2>
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
              <h2 className="section-heading">{t('pdResultHeading')}</h2>
              <div className="result-card">
                {project.resultNumber && (
                  <div className="result-stat-pill">
                    {project.resultNumber}
                  </div>
                )}
                <p className="result-narrative" dir="ltr">{project.result}</p>
              </div>
            </section>
          </div>

          {/* Sidebar / Meta Details */}
          <aside className="case-study-sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-title">{t('pdTechStack')}</h3>
              <div className="sidebar-tags">
                {project.stack.map((tech) => (
                  <span key={tech} className="tech-tag" dir="ltr">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <h3 className="sidebar-title">{t('pdSummaryTitle')}</h3>
              <dl className="meta-list">
                <dt>{t('pdCategory')}</dt>
                <dd>{project.category}</dd>
                <dt>{t('pdRoleScope')}</dt>
                <dd>{t('pdRoleScopeVal')}</dd>
                {project.resultNumber && (
                  <>
                    <dt>{t('pdKeyMetric')}</dt>
                    <dd>{project.resultNumber}</dd>
                  </>
                )}
                <dt>{t('pdAvailability')}</dt>
                <dd>{t('pdAvailabilityVal')}</dd>
              </dl>
            </div>

            <div className="sidebar-card cta-card">
              <h3>{t('pdChallengeTitle')}</h3>
              <p>{t('pdChallengeBody')}</p>
              <Link to="/contact" className="btn-primary full-width">
                {t('pdDiscussBtn')}
              </Link>
            </div>
          </aside>
        </div>

        {/* Next Case Study Banner */}
        <div className="next-project-banner">
          <span className="next-label">{t('pdNextLabel')}</span>
          <Link to={`/projects/${nextProject.slug}`} className="next-link">
            <h3>{nextProject.name} →</h3>
          </Link>
        </div>
      </div>
    </motion.main>
  );
}
