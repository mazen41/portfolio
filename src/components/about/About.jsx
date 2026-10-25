import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../navbar/Navbar';
import { pageVariants, easeOutExpo, fadeUp, staggerParent } from '../../motionSystem';
import './about.css';

const SKILLS = {
  'Mobile':    ['Flutter', 'Dart', 'Firebase', 'In-App Purchases', 'Push Notifications'],
  'Frontend':  ['React', 'Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'SCSS'],
  'Backend':   ['Laravel', 'PHP', 'Node.js', 'REST API', 'JWT Auth', 'MySQL'],
  'Tools':     ['Git', 'Docker', 'Postman', 'Figma', 'Linux', 'XAMPP'],
};

const TIMELINE = [
  {
    year: '2024–Now',
    role: 'Senior Full Stack Developer',
    desc: 'Architecting and shipping SaaS platforms, enterprise systems, and production mobile apps across multiple domains — security, e-commerce, fintech, and education.',
  },
  {
    year: '2022–2024',
    role: 'Full Stack Developer',
    desc: 'Built HR, ERP, procurement, and logistics platforms for B2B clients. Led frontend + backend delivery end-to-end.',
  },
  {
    year: '2020–2022',
    role: 'Flutter & Web Developer',
    desc: 'Started building mobile apps with Flutter alongside Laravel backends. Shipped first production apps to Play Store and App Store.',
  },
  {
    year: '2018–2020',
    role: 'Frontend Developer',
    desc: 'React UIs, component systems, and responsive web apps. Got deep into JavaScript, CSS architecture, and design systems.',
  },
];

export default function About() {
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

      {/* ── Intro ──────────────────────────────────────────── */}
      <motion.section
        className="about-intro"
        variants={staggerParent}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="about-eyebrow"
          variants={fadeUp}
          transition={{ duration: 0.35, ease: easeOutExpo }}
        >
          About
        </motion.p>
        <motion.h1
          className="section-title about-headline"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.05 }}
        >
          I turn complex problems<br />
          into <span className="gradient-text">clean, fast products.</span>
        </motion.h1>
        <motion.p
          className="about-bio"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.1 }}
        >
          Senior Full Stack Developer with 6+ years building enterprise platforms, SaaS systems,
          and native mobile apps — from whiteboard to production. I work across the full stack:
          Flutter for mobile, React/Next.js for web frontends, and Laravel for robust backends.
          I've shipped products in Egypt, Saudi Arabia, and beyond.
        </motion.p>
      </motion.section>

      {/* ── Skills ─────────────────────────────────────────── */}
      <section className="about-skills">
        <h2 className="about-section-label">Tech Stack</h2>
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
        <h2 className="about-section-label">Experience</h2>
        <div className="timeline-list">
          {TIMELINE.map((item, idx) => (
            <motion.div
              key={idx}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: easeOutExpo, delay: idx * 0.06 }}
            >
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <h3 className="timeline-role">{item.role}</h3>
                <p  className="timeline-desc">{item.desc}</p>
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
          ↓ Download Resume
        </a>
        <a
          href="https://github.com/mazen41"
          target="_blank"
          rel="noopener noreferrer"
          className="about-gh-btn"
        >
          ✧ View GitHub
        </a>
      </motion.div>

    </motion.main>
  );
}
