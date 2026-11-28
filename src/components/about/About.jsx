import useSeo from '../../useSeo';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../navbar/Navbar';
import VerifiedIcon from '@mui/icons-material/Verified';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { pageVariants, easeOutExpo, fadeUp, staggerParent } from '../../motionSystem';
import { useLanguage } from '../../i18n/LanguageContext';
import './about.css';

const SKILL_CATEGORIES = [
  { key: 'aSkillCatBackend',  items: ['PHP', 'Laravel', 'Node.js', 'RESTful API Design', 'Redis', 'Pusher/Echo'] },
  { key: 'aSkillCatFrontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'Framer Motion'] },
  { key: 'aSkillCatMobile',   items: ['Flutter', 'Dart', 'Android', 'iOS', 'In-App Purchases', 'Push Notifications'] },
  { key: 'aSkillCatData',     items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { key: 'aSkillCatDevops',   items: ['Git', 'Docker', 'Linux', 'Nginx', 'Vercel', 'Postman'] },
];

// Current freelance work first, then previous employment (Vertex), then earlier freelance work.
const TIMELINE = [
  {
    yearKey: 'aTime1Year',
    roleKey: 'aTime1Role',
    companyKey: 'aTime1Company',
    badgeKey: 'aTime1Badge',
    descKey: 'aTime1Desc',
  },
  {
    yearKey: 'aTimeVertexYear',
    roleKey: 'aTimeVertexRole',
    companyKey: 'aTimeVertexCompany',
    badgeKey: 'aTimeVertexBadge',
    descKey: null,
  },
  {
    yearKey: 'aTime2Year',
    roleKey: 'aTime2Role',
    companyKey: 'aTime2Company',
    badgeKey: 'aTime2Badge',
    descKey: 'aTime2Desc',
  },
];

export default function About() {
  const { t } = useLanguage();
  useSeo({ title: 'About | Mazen Hossny, Full-Stack Developer', description: 'Mazen Hossny: 6 years of full-stack engineering across SaaS, e-commerce, HR, logistics and mobile apps, with 50K+ app downloads. Live in Egypt, Saudi Arabia and the UAE.', path: '/about' });
  return (
    <motion.main
      className="about-page page-shell"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: easeOutExpo }}
    >
      <Navbar />

      {/* ── Intro Section with Photo & Personal Bio ─────────── */}
      <motion.section
        className="about-intro about-split-layout"
        variants={staggerParent}
        initial="hidden"
        animate="show"
      >
        <div className="about-text-col">
          <motion.div variants={fadeUp} transition={{ duration: 0.35, ease: easeOutExpo }}>
            <span className="about-eyebrow">{t('aEyebrow')}</span>
          </motion.div>

          <motion.h1
            className="section-title about-headline"
            variants={fadeUp}
            transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.05 }}
          >
            {t('aHead1')}<br />
            <span className="gradient-text">{t('aHead2')}</span>
          </motion.h1>

          <motion.div
            className="freelance-availability-badge"
            variants={fadeUp}
            transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.08 }}
          >
            <WorkOutlineIcon className="avail-icon" />
            <span>{t('aAvailPrefix')} <strong>{t('aAvailRole')}</strong> {t('aAvailSuffix')}</span>
          </motion.div>

          <motion.p
            className="about-bio"
            variants={fadeUp}
            transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.1 }}
          >
            {t('aBio1')}
          </motion.p>

          <motion.p
            className="about-bio-personal"
            variants={fadeUp}
            transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.12 }}
          >
            {t('aBio2')}
          </motion.p>

          <motion.div
            className="about-proof-strip"
            variants={fadeUp}
            transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.15 }}
          >
            {[
              { valKey: 'aProofYearsVal', labelKey: 'aProofYearsLabel' },
              { valKey: 'aProofDownloadsVal', labelKey: 'aProofDownloadsLabel' },
              { valKey: 'aProofRegionsVal', labelKey: 'aProofRegionsLabel' },
              { valKey: 'aProofStackVal', labelKey: 'aProofStackLabel' },
            ].map(({ valKey, labelKey }) => (
              <div key={valKey} className="about-proof-item">
                <span className="about-proof-val" dir="ltr">{t(valKey)}</span>
                <span className="about-proof-label">{t(labelKey)}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mazen's Photo / Portrait Frame */}
        <motion.div
          className="about-photo-col"
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.15 }}
        >
          <div className="profile-photo-frame">
            <div className="profile-image-container">
              {/* Initials avatar, shown until a portrait is added */}
              <div className="profile-avatar-placeholder">
                <span className="avatar-initials">MH</span>
                <span className="avatar-caption">{t('aAvatarName')}</span>
              </div>
            </div>
            <div className="photo-badge">
              <VerifiedIcon className="photo-badge-icon" />
              <div>
                <strong>{t('aBadgeName')}</strong>
                <span>{t('aBadgeRole')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* ── Skills ─────────────────────────────────────────── */}
      <section className="about-skills">
        <h2 className="about-section-label">{t('aSkillsTitle')}</h2>
        <div className="skills-grid">
          {SKILL_CATEGORIES.map(({ key, items }, idx) => (
            <motion.div
              key={key}
              className="skill-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: easeOutExpo, delay: idx * 0.07 }}
            >
              <span className="skill-group-label">{t(key)}</span>
              <div className="skill-pills">
                {items.map((s) => (
                  <span key={s} className="skill-pill" dir="ltr">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Timeline ───────────────────────────────────────── */}
      <section className="about-timeline">
        <h2 className="about-section-label">{t('aTimelineTitle')}</h2>
        <div className="timeline-list">
          {TIMELINE.map((item, idx) => (
            <motion.div
              key={idx}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: easeOutExpo, delay: idx * 0.08 }}
            >
              <div className="timeline-year">
                <span>{t(item.yearKey)}</span>
                {item.badgeKey && (
                  <span className="timeline-status-badge">{t(item.badgeKey)}</span>
                )}
              </div>
              <div className="timeline-content">
                <h3 className="timeline-role">{t(item.roleKey)}</h3>
                <span className="timeline-company">{t(item.companyKey)}</span>
                {item.descKey && <p className="timeline-desc">{t(item.descKey)}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA row ──────────────────────────────────────────── */}
      <motion.div
        className="about-cta-row"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
      >
        <a
          href="/resume.pdf"
          download
          className="about-cv-btn"
        >
          {t('aCvBtn')}
        </a>
        <a
          href="https://github.com/mazen41"
          target="_blank"
          rel="noopener noreferrer"
          className="about-gh-btn"
        >
          {t('aGhBtn')}
        </a>
        <a
          href="https://www.linkedin.com/in/mazen-hossny-54a8a02b7/"
          target="_blank"
          rel="noopener noreferrer"
          className="about-gh-btn"
        >
          {t('aLiBtn')}
        </a>
      </motion.div>

    </motion.main>
  );
}
