import useSeo from '../../useSeo';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../navbar/Navbar';
import VerifiedIcon from '@mui/icons-material/Verified';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { pageVariants, easeOutExpo, fadeUp, staggerParent } from '../../motionSystem';
import './about.css';

const SKILLS = {
  'Backend & APIs':  ['PHP', 'Laravel', 'Node.js', 'RESTful API Design', 'Redis', 'Pusher/Echo'],
  'Frontend':        ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'Framer Motion'],
  'Mobile':          ['Flutter', 'Dart', 'Android', 'iOS', 'In-App Purchases', 'Push Notifications'],
  'Data & Caching':  ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  'DevOps & Tools':  ['Git', 'Docker', 'Linux', 'Nginx', 'Vercel', 'Postman'],
};

// Accurately reflects CV: 2024–Now (Vertex / Full-Stack & Freelance), 2020–2024 (Freelance Full-Stack)
const TIMELINE = [
  {
    year: '2024 – Present',
    role: 'Full-Stack Developer (Remote & Freelance)',
    company: 'Vertex / Self-Employed (Freelance)',
    statusBadge: 'Current — Open for Freelance Work',
    desc: 'Delivering production web, SaaS, and mobile applications with Laravel, Next.js, React, and Flutter. Building WhatsApp CRM & AutoReply automation, hotel channel-manager integrations (Nobeds), and optimized REST APIs for thousands of active users.',
  },
  {
    year: '2020 – 2024',
    role: 'Freelance Full-Stack Developer',
    company: 'Self-Employed',
    statusBadge: 'Completed',
    desc: 'Delivered end-to-end web and mobile solutions for clients across Egypt, Saudi Arabia, and the UAE using Laravel, Flutter, Node.js, and React. Built e-commerce stores, classified marketplaces, booking platforms, and custom ERP dashboards.',
  },
];

export default function About() {
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
            <span className="about-eyebrow">About Mazen Hossny</span>
          </motion.div>

          <motion.h1
            className="section-title about-headline"
            variants={fadeUp}
            transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.05 }}
          >
            Engineering scalable platforms,<br />
            <span className="gradient-text">built for real businesses.</span>
          </motion.h1>

          <motion.div
            className="freelance-availability-badge"
            variants={fadeUp}
            transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.08 }}
          >
            <WorkOutlineIcon className="avail-icon" />
            <span>Currently working as a <strong>Freelance Full-Stack Developer</strong> — available for contracts and client projects.</span>
          </motion.div>

          <motion.p
            className="about-bio"
            variants={fadeUp}
            transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.1 }}
          >
            I am a Full-Stack Software Engineer with 6 years of experience delivering production web and mobile applications across SaaS, hospitality, HR, logistics, and e-commerce. Strong in Laravel/PHP, Next.js, React, and Flutter, with hands-on experience in API design, database optimization, third-party integrations, and end-to-end product delivery.
          </motion.p>

          <motion.p
            className="about-bio-personal"
            variants={fadeUp}
            transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.12 }}
          >
            Beyond clean code, I care deeply about product usability, speed, and business outcomes. Whether bridging multi-channel WhatsApp messaging with AI or developing bilingual Arabic/English mobile apps with 50K+ downloads, I partner directly with founders and teams to ship software that works smoothly from day one.
          </motion.p>
        </div>

        {/* Mazen's Photo / Portrait Frame */}
        <motion.div
          className="about-photo-col"
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.15 }}
        >
          <div className="profile-photo-frame">
            <div className="profile-image-container">
              {/* Photo placeholder designed with initials avatar and fallback styling */}
              <div className="profile-avatar-placeholder">
                <span className="avatar-initials">MH</span>
                <span className="avatar-caption">Mazen Hossny</span>
              </div>
            </div>
            <div className="photo-badge">
              <VerifiedIcon className="photo-badge-icon" />
              <div>
                <strong>Mazen Hossny Ahmed</strong>
                <span>Full-Stack Engineer</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* ── Skills ─────────────────────────────────────────── */}
      <section className="about-skills">
        <h2 className="about-section-label">Technical Stack & Skills</h2>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat, items], idx) => (
            <motion.div
              key={cat}
              className="skill-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: easeOutExpo, delay: idx * 0.07 }}
            >
              <span className="skill-group-label">{cat}</span>
              <div className="skill-pills">
                {items.map((s) => (
                  <span key={s} className="skill-pill">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Timeline ───────────────────────────────────────── */}
      <section className="about-timeline">
        <h2 className="about-section-label">Professional Experience (Consistent with CV)</h2>
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
                <span>{item.year}</span>
                {item.statusBadge && (
                  <span className="timeline-status-badge">{item.statusBadge}</span>
                )}
              </div>
              <div className="timeline-content">
                <h3 className="timeline-role">{item.role}</h3>
                <span className="timeline-company">{item.company}</span>
                <p className="timeline-desc">{item.desc}</p>
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
          ↓ Download Resume (Updated)
        </a>
        <a
          href="https://github.com/mazen41"
          target="_blank"
          rel="noopener noreferrer"
          className="about-gh-btn"
        >
          ✧ View GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/mazen-hossny-54a8a02b7/"
          target="_blank"
          rel="noopener noreferrer"
          className="about-gh-btn"
        >
          LinkedIn
        </a>
      </motion.div>

    </motion.main>
  );
}
