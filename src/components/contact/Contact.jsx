import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../navbar/Navbar';
import EmailIcon     from '@mui/icons-material/EmailOutlined';
import LinkedInIcon  from '@mui/icons-material/LinkedIn';
import GitHubIcon    from '@mui/icons-material/GitHub';
import TwitterIcon   from '@mui/icons-material/Twitter';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon     from '@mui/icons-material/Check';
import { pageVariants, easeOutExpo, fadeUp, staggerParent } from '../../motionSystem';
import './contact.css';

const EMAIL = 'mazen.hossn.121@gmail.com';

const SOCIALS = [
  {
    label: 'LinkedIn',
    handle: 'mazen-hossny',
    href: 'https://www.linkedin.com/in/mazen-hossny-54a8a02b7/',
    icon: <LinkedInIcon />,
    color: '#0a66c2',
  },
  {
    label: 'GitHub',
    handle: 'mazen41',
    href: 'https://github.com/mazen41',
    icon: <GitHubIcon />,
    color: '#e8f8ff',
  },
  {
    label: 'Twitter / X',
    handle: '@mazen_builds',
    href: 'https://twitter.com/mazen_hossny',
    icon: <TwitterIcon />,
    color: '#1d9bf0',
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.main
      className="contact-page page-shell"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: easeOutExpo }}
    >
      <Navbar />

      <motion.section
        className="contact-inner"
        variants={staggerParent}
        initial="hidden"
        animate="show"
      >
        {/* ── Heading ──────────────────────────────────────── */}
        <motion.p
          className="contact-eyebrow"
          variants={fadeUp}
          transition={{ duration: 0.35, ease: easeOutExpo }}
        >
          Contact
        </motion.p>

        <motion.h1
          className="section-title contact-headline"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.05 }}
        >
          Let's build something<br />
          <span className="gradient-text">extraordinary.</span>
        </motion.h1>

        <motion.p
          className="contact-sub"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.1 }}
        >
          Whether it's a new product, a team opportunity, or an ambitious technical challenge —
          I'm open to the right conversations.
        </motion.p>

        {/* ── Email block ───────────────────────────────────── */}
        <motion.div
          className="contact-email-block"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.15 }}
        >
          <div className="contact-email-icon"><EmailIcon /></div>
          <div className="contact-email-text">
            <span className="contact-email-label">Email</span>
            <a href={`mailto:${EMAIL}`} className="contact-email-value">{EMAIL}</a>
          </div>
          <button
            className={`contact-copy-btn${copied ? ' copied' : ''}`}
            onClick={copyEmail}
            aria-label="Copy email"
          >
            {copied ? <CheckIcon style={{ fontSize: 16 }} /> : <ContentCopyIcon style={{ fontSize: 16 }} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </motion.div>

        {/* ── Socials ──────────────────────────────────────── */}
        <motion.div
          className="contact-socials"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.2 }}
        >
          {SOCIALS.map(({ label, handle, href, icon, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              style={{ '--social-color': color }}
            >
              <span className="social-icon">{icon}</span>
              <div>
                <span className="social-label">{label}</span>
                <span className="social-handle">{handle}</span>
              </div>
              <span className="social-arrow">↗</span>
            </a>
          ))}
        </motion.div>

      </motion.section>
    </motion.main>
  );
}
