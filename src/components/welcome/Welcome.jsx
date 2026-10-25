import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { pageVariants, easeOutExpo, fadeUp, staggerParent } from '../../motionSystem';
import './welcome.css';

const STATS = [
  { value: '6+',  label: 'Years Experience' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '4',   label: 'Live Mobile Apps' },
  { value: '3',   label: 'Countries Deployed' },
];

const STACK = [
  'Laravel', 'Next.js', 'Flutter', 'React',
  'MySQL', 'PHP', 'Dart', 'TypeScript',
  'REST API', 'Firebase', 'Node.js', 'Tailwind',
];

export default function Welcome() {
  return (
    <motion.main
      className="home-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: easeOutExpo }}
    >
      <Navbar />

      {/* Background orbs */}
      <div className="orb orb-1" aria-hidden />
      <div className="orb orb-2" aria-hidden />

      <div className="home-shell">

        {/* ── Hero ─────────────────────────────────────────── */}
        <motion.section
          className="hero-section"
          variants={staggerParent}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.4, ease: easeOutExpo }}>
            <span className="hero-eyebrow">Available for work</span>
          </motion.div>

          <motion.h1
            className="hero-headline"
            variants={fadeUp}
            transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.05 }}
          >
            Full Stack Developer<br />
            <span className="gradient-text">Building Things</span><br />
            That Ship.
          </motion.h1>

          <motion.p
            className="hero-sub"
            variants={fadeUp}
            transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.1 }}
          >
            I design and build enterprise platforms, SaaS products, and mobile apps —
            from architecture to deployment. Laravel · Next.js · Flutter.
          </motion.p>

          <motion.div
            className="hero-cta-row"
            variants={fadeUp}
            transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.15 }}
          >
            <Link to="/projects" className="btn-primary">View My Work</Link>
            <Link to="/contact"  className="btn-ghost">Get In Touch</Link>
          </motion.div>
        </motion.section>

        {/* ── Stats ────────────────────────────────────────── */}
        <motion.div
          className="stats-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.25 }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="stat-card">
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ── Marquee stack strip ───────────────────────────── */}
      <div className="marquee-wrap" aria-hidden>
        <div className="marquee-track">
          {[...STACK, ...STACK].map((tech, i) => (
            <span key={i} className="marquee-item">{tech}</span>
          ))}
        </div>
      </div>

    </motion.main>
  );
}
